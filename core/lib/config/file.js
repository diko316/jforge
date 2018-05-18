'use strict';



var PATH = require('path');

var DIRECTORY = require('./directory');
var FILE = require('../file');

var CONFIG_FILE = 'config.yml';

function configFile(root) {
    return PATH.join(DIRECTORY.directory(root), CONFIG_FILE);
}


function hasFile(root) {
    return FILE.isFile(configFile(root), 'rw');
}

function resolve(root) {
    var directory = DIRECTORY.resolve(root);
    var current;

    if (directory) {
        current = PATH.join(directory, CONFIG_FILE);

        if (FILE.isFile(current, 'rw')) {
            return current;
        }

    }

    return null;
}

function resolveRootDirectory(root) {
    var resolved = DIRECTORY.directory(root);

    if (resolved) {
        root = PATH.dirname(resolved);

        if (FILE.isDirectory(root)) {
            return root;
        }
    }

    return null;
}

function ensureConfigFile(root) {
    var CDIR = DIRECTORY;
    var FS = FILE;
    var configDirectory, fsConfigFile;

    root = resolveRootDirectory(root);

    // can ensure config file if root directory exists
    if (!root) {
        return false;
    }

    // create config directory if do not exist
    configDirectory = CDIR.directory(root);
    if (!CDIR.hasDirectory(root)) {
        configDirectory = FS.mkdirp(configDirectory);

        // must not proceed if unable to create directory
        if (!configDirectory) {
            return false;
        }
    }

    // create config file if do not exist
    fsConfigFile = configFile(root);
    if (!hasFile(root)) {
        // must not proceed if unable to create config file
        if (!FS.writeFile(fsConfigFile, 'service:') || !hasFile(root)) {
            return false;
        }
    }

    return {
        root: root,
        directory: configDirectory,
        file: fsConfigFile
    };
}


module.exports = {
    CONFIG_FILE: CONFIG_FILE,
    hasFile: hasFile,
    location: configFile,
    resolve: resolve,
    ensureConfigFile: ensureConfigFile
};
