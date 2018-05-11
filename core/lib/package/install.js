'use strict';

var LIB = require('libcore');
var PATH = require('path');
var RUN = require('../run');
var REGISTRY = require('./registry');

var string = LIB.string;
var contains = LIB.contains;

/**
 * Installs or links package.
 */

function install(name, link) {
    var parsed = REGISTRY.parse(name);
    var packageName;

    if (parsed) {
        packageName = parsed[0];
        name = parsed.join('@');

        return RUN.shellRun(
                'npm',
                [
                    link === true ?
                        'link' : 'install',
                    '-y',
                    '-dd',
                    name
                ],
                {
                    cwd: PATH.dirname(require.main.filename),
                    stdout: 'inherit',
                    stderr: 'inherit'
                }
            )
            .then(function () {
                // reset
                if (REGISTRY.resolve(packageName, true)) {
                    return packageName;
                }

                return Promise.reject(
                    new Error('Package installation of [' + name + '] failed.')
                );
            });
    }

    return Promise.reject(new Error('Invalid package [name] to install.'));
}

module.exports = install;

