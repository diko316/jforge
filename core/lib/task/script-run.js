'use strict';

var PATH = require('path');
var CHILD_PROCESS = require('child_process');
var LIB = require('libcore');
var createOptions = require('./options');
var postProcess = require('./post-process');
var string = LIB.string;

function run(name, params, options) {
    var spec = createOptions(name, params, options);

    var childProcess;

    if (!spec) {
        if (!string(name)) {
            return Promise.reject(new Error('Invalid script module [name] parameter.'));
        }

        return Promise.reject(new Error('Invalid arguments in running JS script.'));
    }

    // fork the process
    try {
        childProcess = CHILD_PROCESS.fork(
            spec[0],
            spec[1],
            spec[2]
        );
    }
    catch (e) {
        return Promise.reject(e);
    }

    return postProcess(childProcess, spec);
}

module.exports = run;
