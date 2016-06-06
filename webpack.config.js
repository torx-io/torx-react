var webpack = require('webpack');

module.exports = {
  entry: {
    main: './app/main.js',
    common: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'react-router-redux']
  },
  target: 'web',
  cache: true,
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules']
  },
  output: {
    path: './build',
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: './app',
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js')
  ]
};
