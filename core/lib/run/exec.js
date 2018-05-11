'use strict';

var PATH = require('path');
var CHILD_PROCESS = require('child_process');
var LIB = require('libcore');
var createOptions = require('./options');
var postProcess = require('./post-process');
var string = LIB.string;
var object = LIB.object;

function run(method, name, params, options) {
    var nodeProcess = CHILD_PROCESS;
    var spec = createOptions(name, params, options);
    var childProcess, runner, runnerOptions;

    if (!spec) {
        if (!string(name)) {
            return Promise.reject(
                    new Error('Invalid executable [name] parameter.')
                );
        }

        return Promise.reject(
                    new Error('Invalid arguments for runner executable.')
                );
    }

    runnerOptions = spec[2];
    options = spec[4];

    if (!object(options.env)) {
        runnerOptions.env = {};
    }

    switch (method) {
    case 'script':
    case 'fork':
        runner = nodeProcess.fork;
        break;

    default:
        runner = nodeProcess.spawn;
    }

    try {
        childProcess = runner(
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