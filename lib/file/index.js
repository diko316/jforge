'use strict';

var PATH = require('./path');
var EXIST = require('./exist');
var DIRECTORY = require('./directory');

module.exports = {
    is: EXIST.is,
    exist: EXIST.exist,
    tracePath: EXIST.tracePath,
    fullPath: PATH.fullpath,
    mkdirp: DIRECTORY.mkdirp
};

