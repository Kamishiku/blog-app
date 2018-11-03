var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodemailer = require('nodemailer');
var flash = require('connect-flash'); //had flash functionality to show on screen messages

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Transporter used to get gmail account
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'theinternet.onthewifi@gmail.com',
        clientId: '139955258255-a3c6ilqu6rtocigde7cbrusicg7j00eh.apps.googleusercontent.com',
        clientSecret: 'Q775xefdHA_BGu3ZnY9-6sP-',
        refreshToken: '1/0HfdzyzW3FmnDPqeYkv19_py6zWgMCOqI9DSZ9kQWfc',
        accessToken: 'ya29.GlvDBGA2Z_coEKjQOnXAnBLbTB0wQmS-sARqNGC3V2UATiywNb34IhFq4d7UQvhTobE6pi83-FB2-OvMWjC-mk-EKPMYmwxFe9AOZ7mY6kurYyQ7e1Mu8m8INxg7'
    }
})

module.exports = app;
