'use strict';

var LIBCORE = require('libcore');

var array = LIBCORE.array;
var object = LIBCORE.object;
var number = LIBCORE.number;
var string = LIBCORE.string;
var contains = LIBCORE.contains;

var OPTION_RE = /^-.+$/;

function findParams(option, count, allowOptions) {
    var parameters = option.parameters;
    var processed = option.processed;
    var optionRe = OPTION_RE;

    var c, length, item, limit, list, listLength;

    if (number(count) && count > 0) {
        list = [];
        listLength = 0;
        
        c = processed;
        limit = count;
        length = parameters.length;
        length = Math.min(length - processed, count);
        
        for (; length--; c++) {
            item = parameters[c];
            if (allowOptions !== true && optionRe.test(item)) {
                break;
            }

            processed++;
            list[listLength++] = item;

            if (!--limit) {
                break;
            }
        }

        // all params before do not match listed params
        if (listLength < limit) {
            return false;
        }

        option.processed = processed;

        return list;
    }

    return null;
}


function findOptions(option, reference) {
    var optionRe = OPTION_RE;
    var isNumber = number;
    var isString = string;
    var isArray = array;
    var parameters = option.parameters;
    var processed = option.processed;
    var has = contains;

    var c, length, item, optionItem, optionValue;
    var expected, options;
    var found, foundLength;

    if (object(reference)) {
        options = {};

        c = processed;
        length = parameters.length;
        length = Math.max(length - processed, 0);

        optionItem = null;
        found = null;
        expected = 0;

        for (; length--; c++) {
            item = parameters[c];

            // initialize option
            if (optionItem === null) {
                if (!optionRe.test(item)) {
                    break;
                }

                optionItem = item.substring(1, item.length);
                if (!has(reference, optionItem)) {
                    break;
                }

                // finalize option configuration
                optionValue = reference[optionItem];
                if (isArray(optionValue)) {
                    if (optionValue.length < 2) {
                        return false;
                    }

                    optionItem = optionValue[0];
                    if (!isString(optionItem)) {
                        return false;
                    }

                    optionValue = optionValue[1];
                }

                // flag only! then find another option
                if (optionValue === true || optionValue === 0) {
                    options[optionItem] = true;
                    optionItem = null;
                    expected = 0;
                }
                // find arguments on next iteration
                else if (isNumber(optionValue) && optionValue > -1) {
                    expected = optionValue;
                    found = [];
                    foundLength = 0;
                }
                // invalid option value
                else {
                    return false;
                }
            }
            // find option arguments
            else if (expected) {
                found[foundLength++] = item;

                // last
                if (!--expected) {
                    options[optionItem] = found;
                    optionItem = null;
                }
            }
            // no more options
            else {
                break;
            }

            processed++;
        }

        // there are expected option arguments left
        if (expected) {
            return false;
        }

        option.processed = processed;
        return options;
    }

    return null;
}

function create(config, customParameters) {
    var Class = Option;
    var instance;

    if (array(customParameters)) {
        instance = LIBCORE.instantiate(Class);
        instance.parameters = customParameters;
        Class.call(instance, config);
        return instance;
    }

    return new Class(config);
}

function isOption(option) {
    return option instanceof Option;
}


function Option(config) {
    var options, paramBefore, paramAfter, params;

    if (!this.parameters) {
        this.parameters = process.argv.slice(2);
    }

    if (!object(config)) {
        config = {};
    }

    paramBefore = config.before;
    paramAfter = config.after;
    options = contains(config, 'options') ? config.options : null;

    if (!object(options) && options !== null) {
        throw new Error('Invalid [settings] parameter.');
    }

    // arguments before
    params = findParams(this, paramBefore);
    this.argumentsBefore = params === false ? null : params;
    
    // find options
    params = findOptions(this, options, false);
    this.options = params || {};

    // arguments
    params = findParams(this, paramAfter, true);
    this.arguments = params === false ? null : params;
}

Option.prototype = {
    parameters: null,
    processed: 0,
    argumentsBefore: null,
    arguments: null,
    options: null,

    constructor: Option,

    next: function (config) {
        var Class = Option;
        var instance = LIBCORE.instantiate(Class);

        instance.parameters = this.parameters;
        instance.processed = this.processed;

        Class.call(instance, config);

        return instance;
    },

    beforeString: function () {
        var before = this.argumentsBefore;

        if (before) {
            return before.join(' ');
        }

        return '';
    },

    afterString: function () {
        var after = this.arguments;

        if (after) {
            return after.join(' ');
        }

        return '';
    },

    getRemaining: function () {
        return this.parameters.slice(this.processed);
    }
};

module.exports = {
    Option: Option,
    isOption: isOption,
    create: create
};
