/**
 * Created by Tal on 06/01/2017.
 */
'use strict';

var express = require('express');
var router = express.Router();

var getUserLibrary = require('../logics/get-user-library');
var createList = require('../logics/create-new-list');
var getList = require('../logics/get-user-book-list');

router.get('/library', function (req, res) {
    if (!req.user) {
        return res.status(200).send({success: false, error: "User is not logged in."});
    } else {
        getUserLibrary(req.user, req.user._id.toString(), function (err, userLibrary) {
            if (err) {
                return res.status(200).send({success: false, error: "Error during fetching user library."});
            } else {
                return res.status(200).send({success: true, library: userLibrary});
            }
        })
    }
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/list', function (req, res) {
    if (!req.user) {
        return res.status(200).send({success: false, error: "User is not logged in."});
    } else {
        createList(req.user._id.toString(), req.user.name, req.body, function (err) {
            if (err) {
                return res.status(200).send({success: false, error: "Error during list creation."});
            } else {
                return res.status(200).send({success: true});
            }
        });
    }
});

router.get('/list/:id', function (req, res) {
    getList(req.params.id, function (err, list) {
        if (err) {
            return res.status(200).send({success: false, error: "Error while fetching the list."});
        } else {
            return res.status(200).send({success: true, list: list});
        }
    });
});


module.exports = router;