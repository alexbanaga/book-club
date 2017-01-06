/**
 * Created by Tal on 05/01/2017.
 */
'use strict';

const config = require('../config').twitter;
const User = require('../models/User');
var TwitterStrategy = require('passport-twitter').Strategy;

function twitterLogin(passport) {
    passport.use(new TwitterStrategy({
            consumerKey: config.consumerKey,
            consumerSecret: config.consumerSecret,
            callbackURL: "http://www.bookclub.me/auth/twitter/callback"
        },
        function (token, tokenSecret, profile, done) {
            console.log(JSON.stringify(profile));
            var mainEmail = profile.emails.shift();
            if (!mainEmail) {
                return done(new Error("Twitter user's email was not found."));
            }

            User.findOne({
                $or: [{email: mainEmail},
                    {twitterId: profile.id}]
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
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        displayName: profile.displayName || (profile.name.givenName + " " + profile.name.familyName)
                    });

                    newUser.save(function (err, savedUser) {
                        return done(err, savedUser);
                    });
                }
            });
        }));
}

module.exports = twitterLogin;