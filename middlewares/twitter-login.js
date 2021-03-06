/**
 * Created by Tal on 05/01/2017.
 */
'use strict';

const config = require('../config').twitter;
const User = require('../models/User');
var debug = require('debug')('read-list:server');
var TwitterStrategy = require('passport-twitter').Strategy;

function twitterLogin(passport) {
    passport.use(new TwitterStrategy({
            consumerKey: config.consumerKey,
            consumerSecret: config.consumerSecret,
            callbackURL: "http://www.bookclub.me/auth/twitter/callback"
        },
        function (token, tokenSecret, profile, done) {
            debug(profile);
            var mainEmail;
            if (profile.emails) {
                mainEmail = profile.emails.shift();
            }

            var searchConditions = [{twitterId: profile.id}];
            if (mainEmail)
                searchConditions.push({email: mainEmail});

            User.findOne({
                $or: searchConditions
            }, function (err, user) {
                if (err) {
                    return done(err);
                } else if (user) {
                    if (user.twitterId) {
                        return done(null, user);
                    } else {
                        user.twitterId = profile.id;
                        user.save(function (err) {
                            return done(err, user);
                        });
                    }
                } else {
                    var newUser = new User({
                        email: mainEmail,
                        twitterId: profile.id,
                        twitterName: profile.username,
                        name: profile.displayName
                    });

                    newUser.save(function (err, savedUser) {
                        return done(err, savedUser);
                    });
                }
            });
        }));
}

module.exports = twitterLogin;