'use strict';



var PATH = require('path');

var DIRECTORY = require('./directory');
var FILE = require('../file');

var CONFIG_FILE = 'config.yml';

function configFile(root) {
    return PATH.join(DIRECTORY.directory(root), CONFIG_FILE);
}


function hasFile(root) {
    return FILE.isFile(configFile(root), 'rw');
}

function resolve(root) {
    var directory = DIRECTORY.resolve(root);
    var current;

    if (directory) {
        current = PATH.join(directory, CONFIG_FILE);

        if (FILE.isFile(current, 'rw')) {
            return current;
        }

    }

    return null;
}


module.exports = {
    CONFIG_FILE: CONFIG_FILE,
    hasFile: hasFile,
    location: configFile,
    resolve: resolve
};
