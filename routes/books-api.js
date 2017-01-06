/**
 * Created by Tal on 06/01/2017.
 */
'use strict';

var newrelic = require('newrelic');
var express = require('express');
var router = express.Router();

var getUserLibrary = require('../logics/get-user-library');
var createOrUpdateList = require('../logics/create-or-update-list');
var getList = require('../logics/get-user-book-list');

router.get('/library', function (req, res) {
    if (!req.user) {
        return res.status(200).send({success: false, error: "User is not logged in."});
    } else {
        getUserLibrary(req.user, req.user._id.toString(), function (err, userLibrary) {
            if (err) {
                return res.status(200).send({success: false, error: "Error during fetching user library."});
            } else {
                return res.status(200).send({success: true, data: userLibrary});
            }
        })
    }
});

router.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy(function (err) {
        if (err) {
            newrelic.noticeError(err);
        }

        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.redirect('/');
    });
});

router.post('/list', function (req, res) {
    if (!req.user) {
        return res.status(200).send({success: false, error: "User is not logged in."});
    } else {
        createOrUpdateList(req.user._id.toString(), req.body.listId, req.body.title,
            req.user.name, req.body.books, function (err, listId) {
                if (err) {
                    return res.status(200).send({success: false, error: "Error during list creation."});
                } else {
                    return res.status(200).send({success: true, listId: listId});
                }
            });
    }
});

router.get('/list/:id', function (req, res) {
    getList(req.params.id, function (err, list) {
        if (err) {
            return res.status(200).send({success: false, error: "Error while fetching the list."});
        } else {
            return res.status(200).send({success: true, data: list});
        }
    });
});


module.exports = router;