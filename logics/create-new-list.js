/**
 * Created by Tal on 29/12/2016.
 */
'use strict';

const newrelic = require('newrelic');
const BookList = require('../models/BookList');

function createNewList(userId, authorName, bookList, callback) {
    var newList = new BookList({
        userId: userId,
        name: bookList.listName,
        authorName: authorName,
        books: bookList.books
    });

    newList.save(function (err) {
        if (err) {
            newrelic.noticeError(err);
        }

        return callback(err);
    })
}

module.exports = createNewList;