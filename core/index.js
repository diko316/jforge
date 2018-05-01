'use strict';

var file = require('./lib/file');
var cli = require('./lib/cli');
var error = require('./lib/error');

module.exports = {
    prompt: cli.prompt,
    readFile: file.readFile,

    logError: error.logError
};
