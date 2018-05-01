'use strict';


var PATH = require('path');

var CONFIG = require('../config');
var FILE = require('../file');

var RUNNER_FILE = 'run.js';

function runnerFile(root) {
    return PATH.join(CONFIG.directory(root), RUNNER_FILE);
}


function hasFile(root) {
    return FILE.isFile(runnerFile(root), 'rw');
}

function resolve(root) {
    var directory = CONFIG.resolveDirectory(root);
    var current;

    if (directory) {
        current = PATH.join(directory, RUNNER_FILE);

        if (FILE.isFile(current, 'rw')) {
            return current;
        }

    }

    return null;
}


module.exports = {
    RUNNER_FILE: RUNNER_FILE,
    hasFile: hasFile,
    location: runnerFile,
    resolve: resolve
};
