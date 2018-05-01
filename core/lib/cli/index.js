'use strict';

var config = require('./config-file');
var runner = require('./runner-file');
var shell = require('./shell');
var options = require('./options');
var exec = require('./exec');
var log = require('./log');

module.exports = {
    configFile: config.location,
    hasConfig: config.hasFile,
    resolveConfig: config.resolve,

    runnerFile: runner.location,
    hasRunner: runner.hasFile,
    resolveRunner: runner.resolve,

    prompt: shell.prompt,

    arguments: options.create,

    directExecCommand: exec.directExecCommand
};

