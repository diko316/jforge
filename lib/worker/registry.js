'use strict';

var LIBCORE = require('libcore');
var Base = require('./base');

var REGISTRY = LIBCORE.createRegistry();
var method = LIBCORE.method;
var string = LIBCORE.string;




function register(name, Class) {
    var BaseClass = Base;

    if (!method(Class) ||
        !(Class.prototype instanceof BaseClass || Class === BaseClass)) {
        throw new Error('Invalid Worker [Class] parameter.');
    }

    if (!string(name)) {
        throw new Error('Invalid Worker [name] parameter.')
    }

    REGISTRY.set(name, Class);
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
