/**
 * Created by Tal on 29/12/2016.
 */
'use strict';

var Users = require('../models/User');
var facebookLogin = require('./facebook-login');
var twitterLogin = require('./twitter-login');

function initPassport(passport) {
    passport.serializeUser(function (user, done) {
        //return the unique id for the user
        return done(null, user._id || user.id);
    });

    passport.deserializeUser(function (id, done) {
        Users.findById(id, function (err, user) {
            if (err) {
                console.log(err);
                return done(err);
            } else if (!user) {
                return done(new Error('User was not found.'));
            } else {
                return done(err, user);
            }
        });
    });

    facebookLogin(passport);
    twitterLogin(passport);
}

module.exports = initPassport;