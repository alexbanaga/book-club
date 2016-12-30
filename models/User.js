/**
 * Created by Tal on 29/12/2016.
 */
'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    firstName: {type: String, required: true},
    middleName: {type: String, default: ""},
    lastName: {type: String, required: true},
    facebookId: {type: String, required: false},
    twitterId: {type: String, required: false},
    updatedAt: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now}
});

var userModel;

if (mongoose.models.Users) {
    userModel = mongoose.model('User');
} else {
    userModel = mongoose.model('User', userSchema, 'users');
}

module.exports = userModel;