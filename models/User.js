/**
 * Created by Tal on 29/12/2016.
 */
'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    displayName: {type: String, required: true},
    facebookId: {type: String, required: false},
    twitterId: {type: String, required: false},
    googleId: {type: String, required: false},
    updatedAt: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now}
});

userSchema.pre('save', function(next){
    this.updatedAt = new Date();
    next();
});

var userModel;

if (mongoose.models.Users) {
    userModel = mongoose.model('User');
} else {
    userModel = mongoose.model('User', userSchema, 'users');
}

module.exports = userModel;