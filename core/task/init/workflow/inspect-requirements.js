'use strict';


var jforge = require('jforge');
var path = require('path');
var config = require('../config');

var ROOT = config.rootDirectory;

function inspectRootDirectory() {
    if (jforge.isDirectory(config.workingDirectory, 'rw')) {
        return Promise.resolve(true);
    }
    else {
        return Promise.reject(new Error('working directory is not writable'));
    }
}


function inspectRequirements() {
    return inspectRootDirectory();
}

module.exports = inspectRequirements;
