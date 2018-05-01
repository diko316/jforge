'use strict';


var LIB = require('libcore');
var PATH = require('path');
var FILE = require('../file');
var string = LIB.string;
var CONFIG_DIR = '.jforge';

function directory(root) {
    if (!string(root)) {
        root = process.cwd();
    }

    return PATH.join(root, CONFIG_DIR);
}

function hasDirectory(root) {
    return FILE.isDirectory(directory(root), 'rw');
}

function resolve(root) {
    var isDirectory = FILE.isDirectory;
    var path = PATH;
    var getDirectory = directory;
    var flag = 'rw';
    var before = null;
    var current;

    if (!string(root)) {
        root = process.cwd();
    }
    
    current = getDirectory(root);

    for (; current !== before; current = getDirectory(root)) {
        if (isDirectory(current, flag)) {
            return current;
        }

        before = current;
        root = path.dirname(root);
    }

    return null;
}



module.exports = {
    DIRECTORY: CONFIG_DIR,
    directory: directory,
    hasDirectory: hasDirectory,
    resolve: resolve
};
