'use strict';

var LIB = require('libcore');
var CONFIG = require('../config');
var PACKAGE = require('./package');

var string = LIB.string;
var clone = LIB.clone;
var object = LIB.object;

function hasPackage(name) {
    
}

function run(name, params, options) {
    var package = PACKAGE;

    if (!isString(item)) {
        item = CONFIG.resolveDirectory();

        if (isString(item)) {
            options.cwd = item;
        }
        else {
            return Promise.reject(
                    new Error('Unable to resolve working directory')
                );
        }
    }

    // inspect if package is installed
    

    
}


module.exports = run;