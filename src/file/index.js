'use strict';

var PATH = require('./path');
var EXIST = require('./exist');

module.exports = {
    exist: EXIST.exist,
    tracefile: EXIST.tracefile,
    fullPath: PATH.fullpath
};


//console.log(EXIST('cli.js'));

var P = require('path');
console.log(P.dirname(''));