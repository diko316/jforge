'use strict';

var LIB = require('libcore');
var string = LIB.string;
var method = LIB.method;
var iterable = LIB.iterable;
var REGISTRY = LIB.createRegistry();

function resolve(name) {
    var registry = REGISTRY;
    var definition;

    if (string(name)) {
        if (!registry.exists(name)) {
            definition = new Process(name);
            registry.set(name, definition);
        }
        else {
            definition = registry.get(name);
        }

        return definition;
    }

    return null;
}

function exists(name) {
    return REGISTRY.exists(name);
}

function resolveGuard(result) {
    if (result === false) {
        return Promise.reject(new Error('Process Failed.'));
    }

    return true;
}


function generateGuard(handler, scope, parameters) {
    return (new Promise(function (resolve) {
                resolve(handler.apply(scope, parameters));
            }))

            .then(resolveGuard);
}

function chainHandler(promise, handler, scope, parameters) {
    function onFulfill() {
        return handler.apply(scope, parameters);
    }

    return promise.then(onFulfill);
}

function catchPromise(error) {
    console.error(error);
    return null;
}

function Process(name) {
    this.name = name;
    this.guards = [];
    this.handlers = [];
}


Process.prototype = {
    name: null,
    guards: null,
    handlers: null,

    constructor: Process,

    guard: function (handler) {
        var list = this.guards;

        if (method(handler)) {
            list[list.length] = handler;
        }

        return this;
    },

    handler: function (handler) {
        var list = this.handlers;

        if (method(handler)) {
            list[list.length] = handler;
        }

        return this;
    },

    call: function (scope) {
        return this.apply(
                        scope,
                        Array.prototype.slice.call(arguments, 1)
                    );
    },

    apply: function (scope, parameters) {
        var guards = this.guards;
        var handlers = this.handlers;
        var createGuard = generateGuard;
        var promise = null;
        var c, length, promises;

        if (!iterable(parameters)) {
            parameters = [];
        }

        // run guards
        length = guards.length;

        if (length) {
            promises = [];
            promises.length = length;
            c = 0;

            for (; length--; c++) {
                promises[c] = createGuard(guards[c], scope, parameters);
            }

            promise = Promise.all(promises);
        }
        else {
            promise = Promise.resolve(true);
        }

        // apply to functions
        length = handlers.length;
        c = 0;

        if (length) {
            length--;
            promise = chainHandler(
                            promise,
                            handlers[c++],
                            scope,
                            parameters
                        );

            for (; length--; c++) {
                promise = promise.then(handlers[c]);
            }
        }

        return promise.catch(catchPromise);
    }
};



module.exports = {
    exists: exists,
    resolve: resolve
};
