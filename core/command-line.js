#!/usr/bin/env node

'use strict';

var CLI = require('./lib/cli');
var ERROR = require('./lib/error');

/**
 *  Step 1 - Inspect command
 */
function inspectCommand() {
    var options = CLI.arguments({ before: 1 });
    var command = options.beforeString();
    var spec = {
            errorCode: 0,
            error: false,
            direct: true,
            command: command,
            options: options
        };
    var configFile;

    switch (command) {
    case '': // no command
        spec.error = ERROR.get('no-command');
    
    /** falls through **/
    case 'help':
        break;

    case 'init':
        spec.command = command;
        break;


    default:
        configFile = CLI.resolveConfig();

        if (configFile) {
            spec.direct = false;
            spec.command = command;
        }
        else {
            spec.command = '';
            spec.error = ERROR.get('not-configured');
        }
    }

    return Promise.resolve(spec);
}

function runCommand(spec) {
    var command = spec.command;
    var errorMessage = spec.error;
    var errorCode = spec.errorCode;
    var options = spec.options;
    var promise = Promise.resolve(spec);

    function returnSpec() {
        return spec;
    }

    // show Error Message
    if (errorMessage) {
        promise = promise.then(function () {
                        ERROR.logError(errorMessage);
                        return spec;
                    });
    }

    // run command
    if (command) {
        // for direct command
        if (spec.direct) {
            promise = promise
                        .then(function () {
                            return CLI.directExecCommand(
                                        command,
                                        options
                                    );
                        })
                        .then(returnSpec);
        }
        else {
            promise = promise
                        .then(function () {
                            return CLI.execCommand(
                                        command,
                                        options
                                    );
                        })
                        .then(returnSpec);
        }
    }

    if (errorCode) {
        promise = promise.then(function () {
                        process.exit(errorCode);
                    });
    }
    
    return promise;
}

inspectCommand()
    .then(runCommand)
    .catch(function (error) {
        ERROR.logError(error, 1);
    });
