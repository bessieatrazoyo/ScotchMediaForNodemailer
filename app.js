var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var config = require('./config');
var mongoose = require('mongoose');

var app = express();

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  app.set('dbUrl', config.db[app.settings.env]);
  mongoose.connect(app.get('dbUrl'));
}
/*
// set environment variable to find database
app.configure(function () {
  // set the 'dbUrl' to the mongodb url that corresponds to the
  // environment we are in
  app.set('dbUrl', config.db[app.settings.env]);
  // connect mongoose to the mongo dbUrl
  mongoose.connect(app.get('dbUrl'));
});
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes.index);
app.use('/users', users.list);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.get('/', routes.index);
app.get('/users', users.list);

app.get('/add/:first/:second', function (req, res) {
  console.log('app.get');
  //convert the two values to floats and add them togehter
  var sum = parseFloat(req.params.first) + parseFloat(req.params.second);
  res.send(200, String(sum));
});

module.exports = app;
