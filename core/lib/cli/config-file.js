#!/usr/bin/env node

'use strict';

var LIB = require('libcore');
var PATH = require('path');
var FILE = require('../file');
var CONFIG_DIR = '.jforge';
var CONFIG_FILE = 'config.yml';

function configFile(root) {
    if (!LIB.string(root)) {
        root = process.cwd();
    }
    return PATH.join(root, CONFIG_DIR, CONFIG_FILE);
}


function hasFile(root) {
    return FILE.isFile(configFile(root), 'r');
}

function resolve() {
    var isFile = FILE.isFile;
    var path = PATH;
    var getConfig = configFile;
    var flag = 'rw';
    var before = null;
    var root = process.cwd();
    var current = getConfig(root);
    

    for (; current !== before; current = getConfig(root)) {
        if (isFile(current, flag)) {
            return current;
        }

        before = current;
        root = path.dirname(root);
    }

    return null;
}


module.exports = {
    CONFIG_DIR: CONFIG_DIR,
    CONFIG_FILE: CONFIG_FILE,
    hasFile: hasFile,
    location: configFile,
    resolve: resolve
};