/**
 * Created by Tal on 29/12/2016.
 */
'use strict';

const newrelic = require('newrelic');
const BookList = require('../models/BookList');

function getUserBookList(listId, callback) {
    BookList.fineOne({listId: listId}, 'title userName books listId createdAr updatedAt', function (err, list) {
        if (err) {
            newrelic.noticeError(err);
            return callback(err);
        } else {
            return callback(null, list);
        }
    })
}

module.exports = getUserBookList;