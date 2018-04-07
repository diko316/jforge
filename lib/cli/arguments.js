'use strict';

var LIBCORE = require('libcore');
var method = LIBCORE.method;
var object = LIBCORE.object;
var string = LIBCORE.string;
var number = LIBCORE.number;
var array = LIBCORE.array;
var contains = LIBCORE.contains;
var clone = LIBCORE.clone;

function eachArguments(callback) {
    var list = process.argv.slice(2);
    var length = list.length;
    var c = 0;

    if (method(callback)) {
        for (; length--; c++) {
            if (callback(list[c]) === false) {
                break;
            }
        }
    }

    return list;
}

function createOptions(options) {
    var isNumber = number;
    var isArray = array;
    var isString = string;
    var has = contains;
    var defaults = {};
    var newOptions = {};

    var name, value, item, optionName;

    if (object(options)) {

        for (name in options) {
            if (!has(options, name)) {
                continue;
            }
            
            value = options[name];
            

            if (isNumber(value) && value > -1) {
                value = [name, value];
            }

            if (isArray(value) && value.length > 1) {
                optionName = value[0];
                if (!isString(optionName)) {
                    continue;
                }

                item = value[1];
                if (!isNumber(item) || item < 0) {
                    continue;
                }

                defaults[optionName] = false;
                newOptions['-' + name] = value;
            }
        }
    }

    return {
        defaults: defaults,
        options: newOptions
    };
}

function configureArguments(options) {
    var newArguments = [];
    var length = 0;
    var optionParams = 0;
    var option = null;
    var foundOptions;

    function callback(value) {

        // waiting params
        if (optionParams) {
            optionParams--;
            option[option.length] = value;
        }
        // if an option
        else if (contains(options, value)) {
            option = options[value];
            optionParams = option[1];
            option = foundOptions[option[0]] = optionParams ? [] : true;
        }
        else {
            newArguments[length++] = value;
        }
    }

    options = createOptions(options);
    foundOptions = clone(options.defaults, true);
    options = options.options;
    
    eachArguments(callback);

    return {
        options: foundOptions,
        arguments: newArguments
    };
}

module.exports = configureArguments;
