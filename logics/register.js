/**
 * Created by Tal on 29/12/2016.
 */
'use strict';

const newrelic = require('newrelic');
const User = require('../models/User');
const async = require('async');
const hash = require('./helpers/hash');

function checkIfUserAlreadyRegistered(email, password, nickname, name, facebookId, twitterId, callback) {
    User.findOne({
        $or: [{email: email},
            {nickname: nickname}]
    }, function (err, user) {
        if (err) {
            newrelic.noticeError(err, 'Error - while check if user already registered during registration.');
            return callback(err);
        } else if (user) {
            var err;
            if (user.email === email)
                err = new Error("Error - user with the same email already exists during registration.");
            else
                err = new Error("Error - user with the same nickname already exists during registration.");

            newrelic.noticeError(err);
            return callback(err);
        } else {
            return callback(null, email, password, nickname, name, facebookId, twitterId);
        }
    });
}

function saveNewUser(email, password, nickname, name, facebookId, twitterId, callback) {
    hash(password, function (pass, salt, hash) {
        var newUser = new User({
            email: email,
            nickname: nickname,
            hash: hash.toString(),
            salt: salt,
            firstName: name.firstName,
            middleName: name.middleName,
            lastName: name.lastName,
            facebookId: facebookId,
            twitterId: twitterId
        });

        newUser.save(function (err, user) {
            if (err) {
                newrelic.noticeError(err, "Error - could not save new user during registration.");
                return callback(err);
            }

            return callback(null, user);
        });
    });
}

function register(email, password, nickname, name, facebookId, twitterId, callback) {
    return async.waterfall([
        async.apply(checkIfUserAlreadyRegistered, email, password, nickname, name, facebookId, twitterId),
        saveNewUser
    ], callback);
}

module.exports = register;