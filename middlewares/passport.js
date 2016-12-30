/**
 * Created by Tal on 29/12/2016.
 */
'use strict';

var Users = require('../models/User');
var LocalStrategy = require('passport-local').Strategy;

function initPassport(passport) {
    passport.serializeUser(function (user, done) {
        //return the unique id for the user
        return done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        console.log(id);
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

    passport.use('login', new LocalStrategy({
            usernameField: 'facebookId',
            passwordField: 'token',
            passReqToCallback: true
        },
        function (req, facebookId, token, done) {
            login(req.body.email, facebookId, token, function (err, user) {
                if (err) {
                    return done(err);
                } else {
                    return done(null, user);
                }
            });
        }
    ));
}

module.exports = initPassport;