/**
 * Created by Tal on 06/01/2017.
 */
'use strict';

function setupRoutes(app, passport) {
    var loginRoutes = require('./login');
    var booksApi = require('./books-api');



    loginRoutes(app, passport);
    app.use('/api', booksApi);
}

module.exports = setupRoutes;