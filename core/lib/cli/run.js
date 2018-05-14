'use strict';

var LIB = require('libcore');
var PATH = require('path');

var CONFIG = require('../config');
var RUN = require('../run');
var PACKAGE = require('../package');

var MESSAGE = require('./message');
var processor = require('./processor');
var OPTIONS = require('./options');

var object = LIB.object;
var string = LIB.string;
var array = LIB.array;
var PACKAGE_DIR = PATH.dirname(require.main.filename);


function runPackage(command, options) {
    var packageName = 'jforge-' + command;
    var rootDir = PACKAGE_DIR;
    var params = OPTIONS.isOption(options) ?
                    options.getRemaining() :
                    array(options) ?
                        options : [];

    return PACKAGE.ensure(packageName)
            .then(function(name) {

                params.splice(0, 0, name);

                // run
                return RUN.scriptRun(
                            PATH.join(rootDir, 'package-run.js'),
                            params,
                            {
                                cwd: rootDir,
                                message: MESSAGE.handler
                            }
                        );
            });
}

function guardRunPackage(message) {
    var name, parameters, options;

    if (object(message)) {
        name = message.task;
        if (!string(name)) {
            return false;
        }

        parameters = message.parameters;
        if (!array(parameters)) {
            return false;
        }

        return true;
    }

    return false;
}

function handlePackageRun(message) {
    return runPackage(
                message.task,
                message.parameters
            )
            .then(function () {
                return message.task;
            });
}

processor
    .resolve('run-task')
    .guard(guardRunPackage)
    .handler(handlePackageRun);

module.exports = {
    runPackage: runPackage
};