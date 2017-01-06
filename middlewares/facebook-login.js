/**
 * Created by Tal on 05/01/2017.
 */
'use strict';

const config = require('../config').facebook;
const User = require('../models/User');
var debug = require('debug')('read-list:server');
var FacebookStrategy = require('passport-facebook').Strategy;

function facebookLogin(passport) {
    passport.use(new FacebookStrategy({
            clientID: config.appId,
            clientSecret: config.appSecret,
            callbackURL: "http://www.bookclub.me/auth/facebook/callback",
            enableProof: true
        },
        function (accessToken, refreshToken, profile, done) {
            debug(profile);
            var mainEmail;
            if (profile.emails) {
                mainEmail = profile.emails.shift();
            }

            var searchConditions = [{facebookId: profile.id}];
            if (mainEmail)
                searchConditions.push({email: mainEmail});

            User.findOne({
                $or: searchConditions
            }, function (err, user) {
                if (err) {
                    return done(err);
                } else if (user) {
                    if (user.facebookId) {
                        return done(null, user);
                    } else {
                        user.facebookId = profile.id;
                        user.save(function (err) {
                            return done(err, user);
                        });
                    }
                } else {
                    var newUser = new User({
                        email: mainEmail,
                        facebookId: profile.id,
                        facebookName: profile.username,
                        name: profile.displayName
                    });

                    newUser.save(function (err, savedUser) {
                        return done(err, savedUser);
                    });
                }
            });
        }));
}

module.exports = facebookLogin;