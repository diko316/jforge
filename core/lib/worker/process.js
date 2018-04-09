'use strict';

var LIBCORE = require('libcore');
var Files = require('./files');
var WORKER = require('./registry');
var RUN_IDLE =  0;
var RUN_START =  1;
var RUN_COMPLETE = 2;

function create(command, collection) {
    return new Process(command, collection);
}

function taskState(process, task) {
    var status = process.taskStatus;
    var state;

    switch (task) {
    case 'guard':
        state = status.guard;
        break;

    case 'pre':
    case 'postprocess':
        state = status.pre;
        break;

    case 'post':
    case 'postprocess':
        state = status.pre;
        break;

    default:
        state = status.runner;
        break;
    }
}

function Process(command, collection) {
    var worker = WORKER;
    var handlers = worker.get(command);

    this.handlers = handlers;
    this.task = command;
    this.config = worker.optionsConfig(command);
    this.files = new Files();
    this.data = LIBCORE.createRegistry();

    this.taskStatus = {
        guard: handlers.guards ? 0 : false,
        pre: handlers.pre ? 0 : false,
        runner: handlers.runners ? 0 : false,
        post: handlers.post ? 0 : false
    };
}

Process.prototype = {
    handlers: null,
    task: null,
    config: null,
    files: null,
    data: null,
    taskStatus: null,
    constructor: Process,

    isIdle: function (task) {
        return taskState(this, task) === RUN_IDLE;
    },

    isRunning: function (task) {
        return taskState(this, task) === RUN_START;
    },

    isComplete: function (task) {
        return taskState(this, task) === RUN_COMPLETE;
    },

    queue: function () {

    }

};

module.exports = {
    Process: Process,
    create: create
};