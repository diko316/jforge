#!/usr/bin/env node

'use strict';

var COMMANDO = require('./lib/index');
var RUNNER = require('./lib/runner');
var DOCS = require('./lib/docs');
var command;


require('./lib/jforge-init');
require('./lib/jforge-config');


command = RUNNER.extractCliOptions();
if (command) {
    command = command[0];

    // go through initialize/configure process
    if (command === 'init') {
        RUNNER.runCommand('init');
    }
    // inspect configuration
    else {
        console.log('command ', command);

        // run config
        RUNNER.runCommand('config')

            .then(function () {
                return RUNNER.runCommand(command);
            });
    }
}
// show help
else {
    DOCS.show('usage');
}

