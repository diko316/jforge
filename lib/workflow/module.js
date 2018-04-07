'use strict';

var LIBCORE = require('libcore');
var REGISTRY = LIBCORE.createRegistry();

function exist(name) {
    var registry = REGISTRY;
    var string = LIBCORE.string;
    var directory;

    if (string(name)) {

        if (registry.exists(name)) {
            return registry.get(name);
        }

        try {
            directory = require.resolve(name);
            registry.set(name, directory);
            return directory;
        }
        catch(e) {
            // yes, always error when using resolve
        }
    }

    return null;
}

function install(name) {
    
}

module.exports = {
    exist: exist
};
