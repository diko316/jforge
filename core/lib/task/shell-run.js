'use strict';

var PATH = require('path');
var CHILD_PROCESS = require('child_process');
var LIB = require('libcore');
var createOptions = require('./options');
var postProcess = require('./post-process');
var string = LIB.string;
var object = LIB.object;

function run(name, params, options) {
    var spec = createOptions(name, params, options);
    var childProcess, runnerOptions;

    if (!spec) {
        if (!string(name)) {
            return Promise.reject(new Error('Invalid executable file [name] parameter.'));
        }

        return Promise.reject(new Error('Invalid arguments in running JS script.'));
    }

    runnerOptions = spec[2];
    options = spec[4];

    if (!object(options.env)) {
        runnerOptions.env = {};
    }

    try {
        childProcess = CHILD_PROCESS.spawn(
            spec[0],
            spec[1],
            runnerOptions
        );
    }
    catch (error) {
        return Promise.reject(error);
    }

    return postProcess(childProcess, spec);
}

module.exports = run;