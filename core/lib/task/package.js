'use strict';

var LIB = require('libcore');
var PATH = require('path');
var CONFIG = require('../config');
var shellRun = require('./shell-run');

var string = LIB.string;
var PREFIX = 'jforge-';

function getName(name) {
    if (string(name)) {
        name = name.split('@');
        return name[0];
    }

    return null;
}

function hasPackage(name) {
    name = getName(name);

    if (name) {
        try {
            require.resolve(name);
            return true;
        }
        catch (e) {
            // package not resolved
        }
    }

    return false;
}

function installPackage(name) {
    name = getName(name);

    if (name) {
        shellRun(
            'npm', ['install', '-y', name],
            {
                
            });
    }
}

function hasTaskPackage(name) {
    name = getName(name);

    if (name) {
        return hasPackage(PREFIX + name);
    }

    return false;
}
function installTaskPackage(name) {
    var packageName = getName(name);

    if (packageName) {
        packageName = PREFIX + packageName;
        shellRun(
            'npm', ['link', '-y', name],
            {
                cwd: PATH.dirname(require.main.filename)
            });
    }

    return Promise.reject('Invalid Package [name] argument.');
}


module.exports = {
    hasPackage: hasPackage,
    hasTaskPackage: hasTaskPackage,
    installPackage: installPackage,
    installTaskPackage: installTaskPackage
};

