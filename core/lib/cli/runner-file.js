'use strict';

var PATH = require('path');
var CONFIG = require('./config-file');
var FILE = require('../file');
var RUNNER_DIR = CONFIG.CONFIG_DIR;
var RUNNER_FILE = 'run.js';

function hasFile(root) {
    return FILE.isFile(runnerFile(root), 'r');
}

function runnerFile(root) {
    if (!LIB.string(root)) {
        root = process.cwd();
    }
    return PATH.join(root, RUNNER_DIR, RUNNER_FILE);
}

function resolve() {
    var isFile = FILE.isFile;
    var path = PATH;
    var getRunner = runnerFile;
    var flag = 'r';
    var before = null;
    var root = process.cwd();
    var current = getRunner(root);
    

    for (; current !== before; current = getRunner(root)) {
        if (isFile(current, flag)) {
            return current;
        }

        before = current;
        root = path.dirname(root);
    }

    return null;
}

module.exports = {
    RUNNER_DIR: RUNNER_DIR,
    RUNNER_FILE: RUNNER_FILE,
    hasFile: hasFile,
    location: runnerFile,
    resolve: resolve
};
