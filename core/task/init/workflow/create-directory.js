'use strict';

var jforge = require('jforge');
var path = require('path');

var config = require('../config');

function createDirectory() {
    var dir = config.rootDirectory;

    if (!jforge.isDirectory(dir, 'rw')) {
        jforge.mkdirp(dir);
    }
    
    if (!jforge.isDirectory(dir, 'rw')) {
        jforge.logError('Unable to create directory ' + dir);

        return Promise.reject(new Error('Unable to create directory ' + dir));
    }

    return Promise.resolve(dir);
}

module.exports = createDirectory;
