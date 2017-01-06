/**
 * Created by Tal on 06/01/2017.
 */
'use strict';

const newrelic = require('newrelic');
const BookList = require('../models/BookList');

function getUserLibrary(user, userId, callback) {
    BookList.find({userId: userId}, '_id listId title books updatedAt createdAt', function (err, lists) {
        if (err) {
            newrelic.noticeError(err);
            return callback(err);
        } else {
            return callback(null, {
                //TODO: change to support multi lists
                library: lists[0],
                name: user.name,
                facebookName: user.facebookName,
                twitterName: user.twitterName
            });
        }
    });
}

module.exports = getUserLibrary;