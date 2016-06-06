'use strict';
// 3rd Party Packages
var express           = require('express');
var flash             = require('express-flash');
var path              = require('path');
var favicon           = require('serve-favicon');
var logger            = require('morgan');
var cookieParser      = require('cookie-parser');
var session           = require('cookie-session');
var bodyParser        = require('body-parser');

require('babel-register')({
  only: ['./routes/index.js', path.join(__dirname, '../app/**/*')],
  presets: ['es2015', 'react']
});

// Config and internal libraries
var config            = require('../config');
//var fs                = require('fs');

// Required files
var routes            = require('./routes');

// Express Apps
var app               = express();

app.use(favicon(__dirname + '/public/img/favicon.ico'));
// SSL configuration
var useSsl = config.ssl.useSsl; // Set to true to enable ssl

// Setup Views Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// var accessLogStream = fs.createWriteStream(__dirname + '/../morgan.log', {flags: 'a'});
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('trust proxy', 1);
app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: config.encryptionKey,
  cookie: { maxAge: 600000 }
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../build')));

// Redirect all http traffic to https
if(useSsl) {
  if(config.ssl.dev) {
    app.use(function(req, res, next) {
      if(!req.secure) {
        return res.redirect(['https://', config.ssl.devHost + ':3443', req.url].join(''));
      }
      next();
    });
  } else {
    app.use(function(req, res, next) {
      if(!req.secure) {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
      }
      next();
    });
  }
}

// Setup base index routes
app.use('/404', routes.notfound);

// put other routes here
app.get('*', routes.home);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);

    if( err.status === 404 ) {
      res.render('404');
    } else {
      res.render('error', {
        message: err.message,
        error: err,
        title: 'Error'
      });
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);

  if( err.status === 404 ) {
    res.render('404');
  } else {
    res.render('error', {
      message: err.message,
      error: {},
      title: 'Error'
    });
  }
});

module.exports = app;
