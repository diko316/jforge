'use strict';

var CHILD = require('./child');
var SHELL = require('./shell');
var OPTIONS = require('./options');
var COMMANDO = require('./commando');

module.exports = {
    exec: CHILD.exec,
    prompt: SHELL.prompt,
    arguments: OPTIONS.create,

    command: COMMANDO.command,
    hasConfig: COMMANDO.hasConfig,
    hasParentConfig: COMMANDO.hasParentConfig,
    hasCurrentConfig: COMMANDO.hasCurrentConfig
};
