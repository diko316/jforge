'use strict';

var EXEC = require('./exec');

function run(name, params, options) {
    return EXEC('fork', name, params, options);
}

module.exports = run;
