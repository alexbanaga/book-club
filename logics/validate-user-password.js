/**
 * Created by Tal on 29/12/2016.
 */
'use strict';

const newrelic = require('newrelic');
const User = require('../models/User');
const async = require('async');
const hash = require('./helpers/hash');

function checkIfUserExists(username, password, callback) {
    User.findOne({
        $or: [{email: username},
            {nickname: username}]
    }, function (err, user) {
        if (err) {
            newrelic.noticeError(err, "Error - could not get user from database during user password validation.");
            return callback(err);
        } else if (!user) {
            var err = new Error("User was not found.");
            newrelic.noticeError(err, "Error - user was not found in database during user password validation.");
            return callback(err);
        } else {
            return callback(null, user, password);
        }
    });
}

function validateUserPassword(user, password, callback) {
    hash(password, user.salt, function (pass, salt, hash) {
        if (user.password === hash.toString()) {
            return callback(null, true);
        } else {
            return callback(null, false);
        }
    });
}

function validateUserPassword(username, password, callback) {
    return async.waterfall([
        async.apply(checkIfUserExists, username, password),
        validateUserPassword
    ], callback);
}

module.exports = validateUserPassword;