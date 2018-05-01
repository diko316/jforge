'use strict';

var file = require('./lib/file');
var cli = require('./lib/cli');
var error = require('./lib/error');

var config = require('./lib/config');
var runner = require('./lib/runner');


module.exports = {
    configDirectory: config.directory,
    configFile: config.file,

    runnerFile: runner.file,

    prompt: cli.prompt,

    mkdirp: file.mkdirp,
    readFile: file.readFile,
    writeFile: file.writeFile,

    isFile: file.isFile,
    isDirectory: file.isDirectory,

    logError: error.logError,

};
