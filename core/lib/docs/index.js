'use strict';

var LIBCORE = require('libcore');
var PATH = require('path');
var FILE = require('../file');
var TEMPLATE = require('./template');

var string = LIBCORE.string;

function getPath(name) {
    if (string(name)) {
        return PATH.join(__dirname, name + '.txt');
    }
    return null;
}

function show(name, params) {
    var path = getPath(name);
    var content = get(name, params);

    if (content) {
        console.log(content);
        return path;
    }
    
    return null;
}

function get(name, params) {
    var path = getPath(name);
    var content;

    if (path) {
        content = FILE.getFileContent(path);

        if (content) {
            return TEMPLATE.apply(content, params);
        }
    }

    return null;
}

module.exports = {
    show: show,
    get: get,
    transform: TEMPLATE.apply
};