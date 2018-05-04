'use strict';

var LIB = require('libcore');
var object = LIB.object;
var string = LIB.string;
var array = LIB.array;
var number = LIB.number;
var assign = LIB.assign;
var method = LIB.method;

function emptyCallback() {
}

function createOptions(name, params, options) {
    var empty = emptyCallback;
    var isObject = object;
    var isString = string;
    var isNumber = number;
    var isFunction = method;

    var runOptions, handlers, item;

    if (!isString(name)) {
        return null;
    }
    else if (isObject(params)) {
        options = params;
        params = [];
    }
    else if (!array(params)) {
        params = [];
    }

    runOptions = {};
    handlers = {};

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

        item = options.onExit;
        handlers.onExit = isFunction(item) ? item : empty;

        item = options.onMessage;
        handlers.onMessage = isFunction(item) ? item : empty;

        item = options.onError;
        handlers.onError = isFunction(item) ? item : empty;

    }

    return [name, params, runOptions, handlers, options];
}

module.exports = createOptions;