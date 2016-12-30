var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
    //TODO: setup to the real page
    res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

module.exports = router;
