'use strict';

var LIB = require('libcore');
var object = LIB.object;
var string = LIB.string;
var array = LIB.array;
var number = LIB.number;
var assign = LIB.assign;
var method = LIB.method;
var clone = LIB.clone;
var contains = LIB.contains;

var DEFAULT_IO = 'pipe';
var IO_INDEX = {
        'stdin': 0,
        'stdout': 1,
        'stderr': 2
    };

function emptyCallback() {
}

function initializeIO(runOptions, options) {
    var isArray = array;
    var io = runOptions.stdio;
    var ioOptions = options.stdio;
    var defaultIO = DEFAULT_IO;

    // if not yet initialized
    if (!isArray(io)) {
        // finalize io
        if (string(ioOptions)) {
            switch (ioOptions) {
                case 'inherit':
                    io = [0, 1, 2];
                    break;
                case 'ignore':
                    io = [ioOptions, ioOptions, ioOptions];
                    break;
                default:
                    io = [defaultIO, defaultIO, defaultIO];
            }
        }
        else if (!array(io)) {
            io = [defaultIO, defaultIO, defaultIO];
        }
        else {
            io = io.slice(0);
        }

        runOptions.stdio = io;
    }

    return runOptions;
}

function createIOOption(name, value, runOptions) {
    var system = process;
    var io = runOptions.stdio;
    var reference = IO_INDEX;
    var defaultIO = DEFAULT_IO;
    var index;

    // generate index
    if (contains(reference, name)) {
        index = reference[name];
    }
    else {
        index = Math.max(io.length, 3);
    }

    if (index < 3 || (value !== null && value !== undefined)) {
        // create value
        switch (value) {
            case system.stderr:
            case system.stdout:
            case system.stdin:
            case 'ipc':
            case 'ignore':
            case 'inherit':
            case 0:
            case 1:
            case 2:
                break;

            case defaultIO:
            /* falls through */
            default:
                value = defaultIO;
                break;
        }

        io[index] = value;
    }

    system = null;
    

    return runOptions;
    
}

function createOptions(name, params, options) {
    var empty = emptyCallback;
    var isObject = object;
    var isString = string;
    var isNumber = number;
    var isFunction = method;
    var configureIO = createIOOption;

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

        item = options.thread;
        runOptions.thread = isString(item) ? item : null;

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

        // initialize IO
        // initializeIO(runOptions, options);

        // configureIO('stdin', options.stdin, runOptions);
        // configureIO('stdout', options.stdout, runOptions);
        // configureIO('stderr', options.stderr, runOptions);
        // configureIO('channel', options.channel, runOptions);

        // initialize Event handlers
        item = options.ready;
        handlers.onReady = isFunction(item) ? item : empty;

        item = options.exit;
        handlers.onExit = isFunction(item) ? item : empty;

        item = options.message;
        handlers.onMessage = isFunction(item) ? item : empty;

        item = options.outputError;
        handlers.onOutputError = isFunction(item) ? item : empty;

        item = options.output;
        handlers.onOutput = isFunction(item) ? item : empty;

        item = options.error;
        handlers.onError = isFunction(item) ? item : empty;

        
    }

    return [name, params, runOptions, handlers, options];
}

module.exports = createOptions;