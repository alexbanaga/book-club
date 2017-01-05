/**
 * Created by Tal on 06/01/2017.
 */
'use strict';

function setupRoutes(app, passport) {
    var loginRoutes = require('./login');


    loginRoutes(app, passport);

}

module.exports = setupRoutes;