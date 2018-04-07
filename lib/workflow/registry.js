'use strict';

var LIBCORE = require('libcore');
var CONFIG = require('../config');
var string = LIBCORE.string;
var array = LIBCORE.array;
var object = LIBCORE.object;
var REGISTRY = LIBCORE.createRegistry();

function initialize() {
    var config = CONFIG;
    var current = config.get();
    var workflows = current.workflow;

    // push
    if (!array(workflows)) {
        current.workflow = {};
        current.order = [];
        config.push();
    }

    return config.get();
}

function register(name) {
    var config = CONFIG;
    var current;

    initialize();

    current = config.get();

    console.log('register! ', name);


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

