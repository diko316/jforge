'use strict';

var LIB = require('libcore');
var CONFIG = require('../config');

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
    var package;

    name = getName(name);

    if (name) {
        package = PREFIX + name;

        try {
            require.resolve(package);
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
    }
}

