'use strict';

var PATH = require('path');
var CHILD_PROCESS = require('child_process');
var LIB = require('libcore');
var string = LIB.string;
var array = LIB.array;
var number = LIB.number;
var method = LIB.method;
var assign = LIB.assign;



function run(name, params, options) {
    var isString = string;
    var isObject = object;
    var isFunction = method;
    var isNumber = number;
    var runOptions = {};
    var hasOption = false;

    var item, childProcess;

    if (isString(name)) {
        if (object(params)) {
            options = params;
            params = [];
        }

        if (!array(params)) {
            params = [];
        }

        if (isObject(options)) {

            item = options.config;
            if (isObject(item)) {
                runOptions = assign(runOptions, item);
            }

            item = options.cwd;
            if (isString(item)) {
                runOptions.cwd = item;
            }

            item = options.silent;
            if (item === true) {
                runOptions.silent = true;
            }

            item = options.uid;
            if (isNumber(item)) {
                runOptions.uid = item;
            }

            item = options.gid;
            if (isNumber(item)) {
                runOptions.gid = item;
            }

        }

        try {
            childProcess = CHILD_PROCESS.fork(
                name,
                params,
                runOptions
            );
        }
        catch (e) {
            return Promise.reject(e);
        }

        return new Promise(function (resolve, reject) {
            var isError = false;
            var errorObject = null;

            function onError(error) {
                var item = options.onErrorMessage;

                isError = true;
                errorObject = error;

                if (isFunction(item)) {
                    item(error);
                }
            }

            function onMessage(message, handle) {
                var item = options.onMessage;

                if (isFunction(item)) {
                    item(message, handle);
                }
            }

            function onExit(code, signal) {
                var child = childProcess;
                var error = isError;
                var item = options.onExit;

                if (isFunction(item)) {
                    item(error, child.stdout, child.stderr);
                }

                // remove listeners
                child.removeAllListeners('exit');
                child.removeAllListeners('message');
                child.removeAllListeners('error');

                if (error) {
                    errorObject.exitCode = code;
                    errorObject.exitSignal = signal;
                    reject(errorObject);
                }
                else {
                    resolve(code);
                }
            }

            childProcess.on('exit', onExit);
            childProcess.on('message', onMessage);
            childProcess.on('error', onError);
        });

    }

    return Promise.reject(new Error('Invalid script module [name] parameter.'));
}

module.exports = run;
