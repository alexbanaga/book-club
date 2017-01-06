/**
 * Created by Tal on 29/12/2016.
 */
'use strict';

var mongoose = require('mongoose');
var hashGenerator = require('../logics/helpers/hash-generator');

var bookSchema = new mongoose.Schema({
    name: {type: String, required: true},
    link: {type: String, required: true},
    personaReview: {type: String, required: true},
    description: {type: String, required: true},
    updatedAt: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now}
});

bookSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

var bookListSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    authorName: {type: String, required: true},
    books: {type: [bookSchema], default: []},
    listId: {type: String, default: null},
    updatedAt: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now}
});

bookListSchema.pre('save', function (next) {
    this.updatedAt = new Date();

    if (!this.listId) {
        this.listId = hashGenerator();
    }

    next();
});

var bookListModel;

if (mongoose.models.BookList) {
    bookListModel = mongoose.model('BookList');
} else {
    bookListModel = mongoose.model('BookList', bookListSchema, 'booklists');
}

module.exports = bookListModel;