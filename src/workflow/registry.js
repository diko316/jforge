'use strict';

var LIBCORE = require('libcore');
var Interogator = require('./interogator');
var WORKER = require('../worker');
var string = LIBCORE.string;
var array = LIBCORE.array;
var object = LIBCORE.object;
var REGISTRY = LIBCORE.createRegistry();


function register(name, questions, workers) {
    var isArray = array;
    var isObject = object;
    var isString = string;
    var getWorker = WORKER.get;

    var target, targetLength, item, list, c, length, workflow, Class, type;

    if (!isString(name)) {
        throw new Error('Invalid workflow [name] parameter.');
    }

    if (!isArray(questions)) {
        throw new Error('Invalid workflow [questions] parameter.');
    }

    if (!isArray(workers)) {
        throw new Error('Invalid workflow [workers] parameter.');
    }

    workflow = {
        name: name,
        questions: new Interogator(questions),
        workers: []
    };

    // populate workers
    target = workflow.workers;
    targetLength = 0;
    list = workers;

    for (c = 0, length = list.length; length--; c++) {
        item = list[c];
        if (isString(item)) {
            item = {
                type: item
            };
        }

        if (!isObject(item)) {
            throw new Error('Invalid worker item.');
        }

        type = item.type;
        if (isString(type, true)) {
            type = type || 'default';
        }
        else {
            throw new Error('Invalid worker type parameter.');
        }

        Class = getWorker(type);
        if (!Class) {
            throw new Error('Worker type ' + type + ' not found.');
        }
        
        target[targetLength++] = new Class(item);
    }

    REGISTRY.set(name, workflow);

}

function get(name) {
    if (!string(name)) {
        return null;
    }

    return REGISTRY.get(name) || null;
}



module.exports = {
    get: get,
    register: register
};

