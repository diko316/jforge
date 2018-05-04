'use strict';

var file = require('./lib/file');
var cli = require('./lib/cli');
var error = require('./lib/error');

var config = require('./lib/config');



module.exports = {
    configDirectory: config.directory,
    configFile: config.file,

    prompt: cli.prompt,

    mkdirp: file.mkdirp,
    readFile: file.readFile,
    writeFile: file.writeFile,

    isFile: file.isFile,
    isDirectory: file.isDirectory,

    logError: error.logError,

};
