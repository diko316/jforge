'use strict';

var config = require('./config');
var workflow = require('./workflow');
var cli = require('./cli');

config.info.moduleDir = __dirname;

module.exports = {
    info: config.info,
    register: workflow.register,
    run: workflow.run,
    push: config.push,
    pull: config.pull,
    arguments: cli.arguments
};
