'use strict';

var CHILD = require('./child');
var SHELL = require('./shell');
var ARGUMENTS = require('./arguments');

module.exports = {
    exec: CHILD.exec,
    prompt: SHELL.prompt,
    arguments: ARGUMENTS
};
