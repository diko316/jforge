'use strict';

var LIB = require('libcore');
var yaml = require('js-yaml');
var fs = require('../file');
var file = require('./file');
var directory = require('./directory');
var string = LIB.string;
var definition = null;

function useDirectory(root) {
    var configObject = definition;
    var data = null;

    // setter
    if (arguments.length) {
        if (!string(root)) {
            return false;
        }
        else {
            configObject = file.ensureConfigFile(root);
            if (configObject) {
                try {
                    data = yaml.safeLoad(fs.readFile(configObject.file));
                }
                catch (error) {
                    console.error(error);
                    return false;
                }
        
                definition = configObject;
                configObject.data = data;
        
                return configObject.root;
            }
        }
    }

    return configObject;
}

function get() {
    if (!definition) {
        useDirectory();
    }

    return definition;
}

function set(path, value) {
    var configObject = get();

    if (configObject) {
        jsonSet(path, configObject.data, value);

        return configObject;
    }

    return undefined;
}

function commit() {
    var configObject = get();

    if (configObject) {
        try {
            fs.writeFile(
                configObject.file,
                yaml.safeDump(configObject.data)
            );

            return true;
        }
        catch (error) {
            console.error(error);
        }
    }

    return false;
}



module.exports = {
    get: get,
    set: set,
    useDirectory: useDirectory,
    commit: commit
};
