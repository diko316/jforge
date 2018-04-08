'use strict';

var CHILD = require('./child');
var SHELL = require('./shell');
var OPTIONS = require('./options');

module.exports = {
    exec: CHILD.exec,
    prompt: SHELL.prompt,
    arguments: OPTIONS.create,
    Option: OPTIONS.Option
};
