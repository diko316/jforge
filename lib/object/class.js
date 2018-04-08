'use strict';

var LIBCORE = require('libcore');
var method = LIBCORE.method;
var object = LIBCORE.object;
var contains = LIBCORE.contains;

function createConstructor(baseConstructor) {
    function Class() {
        baseConstructor.apply(this, arguments);
    }

    return Class;
}

function extend(SuperClass, properties) {
    var lib = LIBCORE;
    var isFunction = method;
    var BasePrototype, Prototype, Class;

    if (!isFunction(SuperClass)) {
        throw new Error('Invalid [SuperClass] to extend.');
    }

    BasePrototype = SuperClass.prototype;
    Prototype = lib.instantiate(SuperClass);

    if (isFunction(properties)) {
        properties = properties(BasePrototype, SuperClass);
    }

    if (!object(properties)) {
        throw new Error('Invalid [properties] to override Sub Class.');
    }

    if (contains(properties, 'constructor')) {
        Class = properties.constructor;

        if (!isFunction(Class)) {
            throw new Error('constructor must be a valid Function Object.');
        }
    }
    else {
        Class = createConstructor(SuperClass);
    }

    Class.prototype = Prototype;
    lib.assign(Prototype, properties);
    Prototype.constructor = Class;

    return Class;
}

module.exports = {
    extend: extend
};
