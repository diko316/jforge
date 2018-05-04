'use strict';

var LIB = require('libcore');
var CONFIG = require('../config');
var scriptRun = require('./script-run');

var string = LIB.string;
var clone = LIB.clone;
var object = LIB.object;

function run(name, params, options) {
    var isString = string;
    var item;

    options = object(options) ? clone(options, true) : {};

    item = options.cwd;

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