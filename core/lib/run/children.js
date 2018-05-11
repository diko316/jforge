'use strict';

var LIB = require('libcore');
var number = LIB.number;
var string = LIB.string;
var contains = LIB.contains;

var PROCESSES = {};
var PROCESSE_IDS = [];
var EXIT_EVENTS = [
        'SIGINT',
        'SIGTERM',
        'SIGKILL',
        'SIGUSR1',
        'SIGUSR2',
        'uncaughtException',
        'close',
        'exit',
        'disconnect'
    ];

function register(child, id) {
    var list = PROCESSES;
    var ids = PROCESSE_IDS;
    var item, current;

    if (!isAlive(child)) {
        return;
    }
    
    if (number(id)) {
        id = '' + id;
    }

    if (!string(id)) {
        id = child.pid;
    }

    current = get(id);

    // has current id
    if (current) {
        // just kill!
        if (current === child) {
            unregister(id);
        }
        // already registered
        else {
            current = null;
            return;
        }
        current = null;
    }

    item = [
        id,
        process,
        null
    ];

    list[id] = item;
    ids[ids.length] = id;

    registerExitEvents(child, id);
}

function unregister(id) {
    var list = PROCESSES;
    var ids = PROCESSE_IDS;
    var child = get(id);

    if (child) {
        unregisterExitEvents(child, id);

        delete list[id];
        ids.splice(ids.indexOf(id), 1);

        // kill!
        if (isAlive(child)) {
            if (hasIPC(child)) {
                child.disconnect();
            }

            if (isAlive(child)) {
                child.exit();
            }
        }
        
    }
}



function get(id) {
    var list = PROCESSES;

    if (!contains(list, id)) {
        return list[id][1];
    }

    return null;
}

function isAlive(child) {
    if (child) {
        // for ipc
        if (hasIPC(child) && child.connected) {
            return true;
        }

        return child.killed;
    }

    return false;
}

function hasIPC(child) {
    if (child) {
        return !!child.channel;
    }

    return false;
}

function registerExitEvents(child, id) {
    var names = EXIT_EVENTS;
    var definition = PROCESSES[id];
    var handler = createOnChildExit(child, id);

    var length = names.length;
    var c = 0;

    for (; length--; c++) {
        child.addListener(names[c], handler);
    }

    definition[2] = handler;
}

function unregisterExitEvents(child, id) {
    var names = EXIT_EVENTS;
    var definition = PROCESSES[id];
    var handler = definition[2];

    var length = names.length;
    var c = 0;

    for (; length--; c++) {
        child.removeListener(names[c], handler);
    }
}

function createOnChildExit(child, id) {
    var childProcess = child;

    function onExit() {
        unregister(id);
        childProcess = null;
    }
}

module.exports = {
    register: register,
    get: get,
    isAlive: isAlive,
    hasIPC: hasIPC
};
