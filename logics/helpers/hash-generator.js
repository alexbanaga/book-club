/**
 * Created by Tal on 29/12/2016.
 */
'use strict';

var Hashids = require('hashids');
var performance = require('performance-now');

const hashLength = 8;
//New Hashids object with 'BinderDonaThat' as salt and a minimum hash length of 13 characters
var hashGenerator = new Hashids('BinderDoneThat', hashLength);

function generateNewHash() {
    return hashGenerator.encode(parseInt(performance().toString().replace('.', '')));
};

module.exports = generateNewHash;