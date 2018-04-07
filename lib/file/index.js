'use strict';

var PATH = require('./path');
var EXIST = require('./exist');

module.exports = {
    is: EXIST.is,
    exist: EXIST.exist,
    tracefile: EXIST.tracefile,
    fullPath: PATH.fullpath
};

