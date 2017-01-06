/**
 * Created by Tal on 06/01/2017.
 */
'use strict';

const newrelic = require('newrelic');
const BookList = require('../models/BookList');

function getUserDetails(user, userId, callback) {
    BookList.find({userId: userId}, '_id userId name books updatedAt createdAt', function (err, lists) {
        if (err) {
            newrelic.noticeError(err);
            return callback(err);
        } else {
            return callback(null, {
                library: lists || [],
                name: user.name,
                facebookName: user.name,
                twitterName: user.twitterName
            });
        }
    });
}