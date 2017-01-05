/**
 * Created by Tal on 29/12/2016.
 */
'use strict';

var newrelic = require('newrelic');
var config = require('./config');
var debug = require('debug')('read-list:server');


function initConnection(mongoose) {
    /// CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function () {
        debug('Mongoose default connection open to ' + config.database.connectionString);
    });

    // If the connection throws an error
    mongoose.connection.on('error', function (err) {
        debug('Mongoose default connection error: ' + err);
        newrelic.noticeError(err, 'An error occurred while trying to connect to the Database.');
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        debug('Mongoose default connection disconnected');
        newrelic.noticeError(new Error('Database has disconnected.'));
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            debug('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    // Create the database connection
    mongoose.connect(config.database.connectionString, {
        server: {
            auto_reconnect: true,
            reconnectTries: Number.MAX_VALUE,
            socketOptions: {
                keepAlive: 100,
                connectionTimeoutMS: 30000
            }
        },
        replset: {
            socketOptions: {
                keepAlive: 100,
                connectionTimeoutMS: 30000
            }
        }
    });
}

//Initialize models
require('./models/User');
require('./models/BookList');

module.exports = initConnection;