'use strict';

var LIBCORE = require('libcore');
var Files = require('./files');
var WORKER = require('./registry');

var string = LIBCORE.string;

function create(command, collection) {
    return new Process(command, collection);
}

function Process(command) {
    var worker = WORKER;
    var handlers = worker.get(command);

    this.handlers = handlers;
    this.task = command;
    this.config = worker.optionsConfig(command);
    this.files = new Files();
    this.data = LIBCORE.createRegistry();
}

Process.prototype = {
    handlers: null,
    task: null,
    config: null,
    files: null,
    data: null,
    errors: null,
    allowed: false,
    constructor: Process,

    reportError: function (error) {
        var list = this.errors;

        if (string(error)) {
            error = new Error(error);
        }

        if (!(error instanceof Error)) {
            error = new Error('Unknown Error.');
        }

        if (!list) {
            list = [];
            this.errors = list;
        }

        list[list.length] = error;

        return this;
    }
};

module.exports = {
    Process: Process,
    create: create
};