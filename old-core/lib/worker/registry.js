'use strict';

var LIBCORE = require('libcore');

var REGISTRY = LIBCORE.createRegistry();
var REGISTRARS = LIBCORE.createRegistry();
var method = LIBCORE.method;
var array = LIBCORE.array;
var string = LIBCORE.string;
var object = LIBCORE.object;
var arraySlice = Array.prototype.slice;


function resolveRegistrar(name) {
    var registrars = REGISTRARS;
    var registrar;

    if (!registrars.exists(name)) {
        registrar = new Registrar(name);
        registrars.set(name, registrar);
        return registrar;

    }
    
    return registrars.get(name);
}

function register(name) {
    if (!string(name)) {
        throw new Error('Invalid handler [name] to register.');
    }

    return resolveRegistrar(name);
}

function createRegisterParameters(handlers) {
    var isFunction = method;
    var c, length, item;

    if (isFunction(handlers)) {
        return [handlers];

    }
    else if (array(handlers)) {
        c = 0;
        length = handlers.length;

        if (!length) {
            throw new Error('Requires at least one handler to register.');
        }

        for (; length--; c++) {
            item = handlers[c];
            if (!isFunction(item)) {
                throw new Error('Invalid item in [handlers] parameter.');
            }
        }

        return handlers;
    }
    throw new Error('Invalid [handlers] parameter.');
}

function registerHandlers(name, handlers) {
    var registry = REGISTRY; 
    var item;

    if (registry.exists(name)) {
        item = registry.get(name);
        item.push.apply(item, handlers);
    }
    else {
        item = handlers.slice(0);
        registry.set(name, item);
    }
}

function guardName(name) {
    return '[' + name + ']';
}

function preName(name) {
    return '<<' + name;
}

function postName(name) {
    return '>>' + name;
}

function runnerName(name) {
    return '^' + name;
}

function provisionName(name) {
    return '!' + name;
}

function get(name) {
    var registry = REGISTRY;
    var entryName;

    if (!string(name)) {
        throw new Error('Invalid runner [name] parameter.');
    }

    entryName = runnerName(name);

    if (registry.exists(entryName)) {
        return {
            provision: registry.get(provisionName(name)) || null,
            guards: registry.get(guardName(name)) || null,
            pre: registry.get(preName(name)) || null,
            runners: registry.get(entryName),
            post: registry.get(postName(name)) || null
        };
    }
    
    return null;
}

function exist(name) {
    if (!string(name)) {
        throw new Error('Invalid runner [name] parameter.');
    }

    return REGISTRY.exists(runnerName(name));
}

function options(name) {

    // only if it exists
    if (exist(name)) {
        return resolveRegistrar(name).commandOptions;
    }

    return null;
}

function Registrar(name) {
    this.name = name;
}

Registrar.prototype = {
    name: null,
    commandOptions: null,
    constructor: Registrar,

    provision: function () {
        var handlers = createRegisterParameters(arraySlice.call(arguments, 0));

        registerHandlers(provisionName(this.name), handlers);

        return this;
    },

    guard: function () {
        var handlers = createRegisterParameters(arraySlice.call(arguments, 0));

        registerHandlers(guardName(this.name), handlers);

        return this;
    },

    pre: function () {
        var handlers = createRegisterParameters(arraySlice.call(arguments, 0));

        registerHandlers(preName(this.name), handlers);

        return this;
    },

    post: function () {
        var handlers = createRegisterParameters(arraySlice.call(arguments, 0));

        registerHandlers(postName(this.name), handlers);

        return this;
    },

    runner: function () {
        var handlers = createRegisterParameters(arraySlice.call(arguments, 0));

        registerHandlers(runnerName(this.name), handlers);

        return this;
    },

    options: function (config) {
        if (object(config)) {
            this.commandOptions = config;
        }

        return this;
    }
};


module.exports = {
    register: register,
    get: get,
    exist: exist,
    optionsConfig: options
};
