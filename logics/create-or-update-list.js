/**
 * Created by Tal on 29/12/2016.
 */
'use strict';

const newrelic = require('newrelic');
const BookList = require('../models/BookList');



function createNewList(userId, title, userName, books, callback) {
    var newList = new BookList({
        userId: userId,
        title: title,
        userName: userName,
        books: books
    });

    newList.save(function (err, savedList) {
        if (err) {
            newrelic.noticeError(err);
            return callback(err);
        }

        return callback(err, savedList.listId);
    });
}

function updateList(userId, listId, title, userName, books, callback) {
    BookList.findOne({listId: listId}, function (err, list) {
        if (err) {
            newrelic.noticeError(err);
            return callback(err);
        } else if (!list) {
            return createNewList(userId, title, userName, books, callback);
        } else {
            list.books = books;
            list.title = title;

            list.markModified('books');

            list.save(function (err) {
                if (err) {
                    newrelic.noticeError(err);
                }

                return callback(err);
            });
        }
    });
}

function createOrUpdateList(userId, listId, title, userName, books, callback) {
    if (listId) {
        return updateList(userId, listId, title, userName, books, callback);
    } else {
        return createNewList(userId, title, userName, books, callback);
    }
}

module.exports = createOrUpdateList;