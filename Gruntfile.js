/*eslint-disable no-console*/
'use strict';

var request = require('request');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.js');

  var reloadPort = 35729, files;

  // Configurable paths for the application
  var appConfig = {
    server: 'server',
    config: 'config',
    app:    'app',
    build:  'build',
    test:   'test'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    txApp: appConfig,
    'tx-node': {
      default: {
        server: {
          file: 'server/bin/www'
        }
      },
      debug: {
        server: {
          file: 'server/bin/www',
          nodeArgs: ['--debug']
        }
      }
    },
    env: {
      test: {
        NODE_ENV: 'test'
      }
    },
    sass: {
      options: {
        sourcemap: 'none'
      },
      main: {
        files: [{
          expand: true,
          cwd: '<%= txApp.server %>/public/css',
          src: ['*.scss'],
          dest: '<%= txApp.server %>/public/css',
          ext: '.css'
        }]
      }
    },
    eslint: {
      options: {
        quiet: true,
        format: 'stylish'
      },
      files: [
        'Gruntfile.js',
        '<%= txApp.app %>/**/*.js',
        '<%= txApp.app %>/**/*.jsx',
        '<%= txApp.server %>/**/*.js',
        '!<%= txApp.server %>/**/*.min.js',
        '!<%= txApp.server %>/public/components/**/*.js',
        '<%= txApp.test %>/**/*.js'
      ]
    },
    uglify: {
      options: {
        mangle: false
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'nyan'
        },
        src: ['<%= txApp.test %>/init.js','<%= txApp.test %>/**/*.js']
      }
    },
    webpack: {
      options: webpackConfig,
      build: {
        plugins: webpackConfig.plugins.concat(
          new webpack.DefinePlugin({
            'process.env': {
              // This has effect on the react lib size
              'NODE_ENV': JSON.stringify('production')
            }
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
        )
      },
      'build-dev': {
        debug: true
      },
      profile: {
        profile: true,
        plugins: webpackConfig.plugins.concat(
          new StatsPlugin('stats.json', {
            chunkModules: true
          })
        )
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'server/bin/www',
          '<%= txApp.server %>/app.js',
          '<%= txApp.server %>/routes/**/*.js',
          '<%= txApp.config %>/*.js',
          '<%= txApp.config %>/*.json',
          '<%= txApp.server %>/libraries/*.js',
          '<%= txApp.server %>/helpers/*.js',
          'Gruntfile.js'
        ],
        tasks: ['tx-node', 'delayed-livereload']
      },
      app: {
        files: ['<%= txApp.app %>/**/*.js'],
        tasks: ['webpack:build-dev'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['<%= txApp.server %>/public/js/*.js'],
        tasks: ['uglify'],
        options: {
          livereload: reloadPort
        }
      },
      css: {
        files: [
          '<%= txApp.server %>/public/css/*.scss'
        ],
        tasks: ['sass'],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: ['<%= txApp.server %>/views/*.pug'],
        options: {
          livereload: reloadPort
        }
      }
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
        var reloaded = !err && res.statusCode === 200;
        if (reloaded) {
          grunt.log.ok('Delayed live reload successful.');
        } else {
          grunt.log.error('Unable to make a delayed live reload.');
        }
        done(reloaded);
      });
    }, 500);
  });

  grunt.registerMultiTask('tx-node', 'Runs grunt-develop with custom settings.', function() {
    console.log('Running grunt-develop for: ' + this.target);
    grunt.config.set('develop', this.data);
    grunt.task.run('develop');
  });

  grunt.registerTask('default', [
    'tx-node:default',
    'sass',
    'webpack:build-dev',
    'watch'
  ]);

  grunt.registerTask('debug', [
    'tx-node:debug',
    'sass',
    'webpack:build-dev',
    'watch'
  ]);

  grunt.registerTask('test', [
    'env:test',
    'eslint',
    'mochaTest'
  ]);

  grunt.registerTask('profile', [
    'webpack:profile'
  ]);

  grunt.registerTask('build', [
    'eslint',
    'sass',
    'webpack:build'
  ]);
};
