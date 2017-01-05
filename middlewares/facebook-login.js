/**
 * Created by Tal on 05/01/2017.
 */
'use strict';

const config = require('../config').facebook;
const User = require('../models/User');
var FacebookStrategy = require('passport-facebook').Strategy;

function facebookLogin(passport) {
    passport.use(new FacebookStrategy({
            clientID: config.appId,
            clientSecret: config.appSecret,
            callbackURL: "http://www.bookclub.me/auth/facebook/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            var mainEmail = profile.emails.shift();
            if (!mainEmail) {
                return done(new Error("Facebook user's email was not found."));
            }

            User.findOne({
                $or: [{email: mainEmail},
                    {facebookId: profile.id}]
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

module.exports = facebookLogin;