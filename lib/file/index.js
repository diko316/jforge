'use strict';

var PATH = require('./path');
var EXIST = require('./exist');
var DIRECTORY = require('./directory');
var CONTENT = require('./content');

module.exports = {
    is: EXIST.is,
    exist: EXIST.exist,
    tracePath: EXIST.tracePath,
    fullPath: PATH.fullpath,
    chdir: PATH.chdir,
    restoreCwd: PATH.restoreCwd,
    mkdirp: DIRECTORY.mkdirp,
    getFileContent: CONTENT.getContent,
    showFileContent: CONTENT.showContent
};

