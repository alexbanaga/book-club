/**
 * Created by Tal on 29/12/2016.
 */
'use strict';

var newrelic = require('newrelic');
var debug = require('debug');
var express = require('express');
var passport = require('passport');
var initPassport = require('./middlewares/passport');
var mongoose = require('mongoose');
var forcedomain = require('forcedomain');
var routes = require('./routes/routes');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
mongoose.Promise = require('bluebird');

var app = express();

//Initialize Mongoose
require('./database-init')(mongoose);

app.use(forceDomain({
    hostname: 'www.bookclub.me'
}));

app.use(logger('dev'));
app.use(session({
    secret: 'Binder Done That',
    store: new MongoStore({mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);


routes(app, passport);


app.use(express.static(path.join(__dirname, 'public/dist')));

//Lets Angular 2 handle unknown routes (including 404)
app.all('*', function(req, res) {
    return res.sendFile(path.join(__dirname, './public/dist/index.html'));
});

// error handler
app.use(function (err, req, res, next) {
    newrelic.noticeError(err,'Error');
    console.log(err);
    console.log(err.message);
    console.log(err.stack);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('Error');
});

module.exports = app;
