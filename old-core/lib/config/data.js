'use strict';

var LIBCORE = require('libcore');
var FILE = require('./file');
var PATH = require('path');
var object = LIBCORE.object;
var string = LIBCORE.string;


var REGISTRY = LIBCORE.createRegistry();
var GENERATED = false;

function fromFile() {
    if (FILE.has()) {
        return FILE.pull();
    }
    return {};
}

function generate() {
    var registry = REGISTRY;
    var current;

    registry.set(fromFile());

    // finalize name
    current = registry.get('name');
    if (!string(current)) {
        registry.set(
            'name',
            PATH.basename(FILE.cwd())
        );
    }

    // commands
    current = registry.get('command');
    if (!object(current)) {
        registry.set('command', {});
    }

    GENERATED = true;
}

function pull() {
    generate();
}

function push() {
    if (!GENERATED) {
        pull();
    }
    FILE.push(REGISTRY.data);
}

function set() {
    var registry = REGISTRY;
    registry.set.apply(registry, arguments);
    push();
}

function get() {
    var registry = REGISTRY;
    return registry.get.apply(registry, arguments);
}


module.exports = {
    pull: pull,
    push: push,
    get: get,
    set: set
};