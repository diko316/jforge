'use strict';

var LIB = require('libcore');
var PATH = require('path');
var CONFIG = require('../config');
var shellRun = require('./shell-run');

var string = LIB.string;
var contains = LIB.contains;
var PREFIX = 'jforge-';
var resolvedPackages = [];

function getName(name) {
    if (string(name)) {
        name = name.split('@');
        return name[0];
    }

    return null;
}

function hasPackage(name) {
    var resolved = resolvedPackages;
    var cache = require.cache;

    name = getName(name);

    if (name) {
        if (contains(resolved, name)) {

            // already resolved
            if (resolved[name]) {
                return true;
            }
            // purge
            else if (contains(cache, name)) {
                delete cache[name];
            }
        }

        try {
            require.resolve(name);
            resolved[name] = true;
            return true;
        }
        catch (e) {
            // package not resolved
            resolved[name] = false;
        }
    }

    return false;
}


/**
 * Links installed package to jforge.
 * It will also install package if not yet installed.
 */

function installPackage(name) {
    name = getName(name);

    if (name) {
        return shellRun(
                'npm',
                ['link', '-y', name],
                {
                    cwd: PATH.dirname(require.main.filename),
                    onStdOut: function (data) {
                        process.stderr.write(data.toString());
                    },

                    onStdError: function (data) {
                        process.stderr.write(data.toString());
                    }
                }
            )
            .then(function () {
                // reset
                if (hasPackage(name)) {
                    return name;
                }

                return Promise.reject(
                    new Error('Package installation of [' + name + '] failed.')
                );
            });
    }

    return Promise.reject(new Error('Invalid package [name] to install.'));
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

