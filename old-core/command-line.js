#!/usr/bin/env node

'use strict';

var COMMANDO = require('./lib/index');
var RUNNER = require('./lib/runner');
var DOCS = require('./lib/docs');
var CONFIG = require('./lib/config');
var command;

require('jforge-init');
require('jforge-help');


command = RUNNER.extractCliOptions();
if (command) {
    command = command[0];

    // go through initialize/configure process
    if (command === 'init') {

        // create initial directory
        if (!CONFIG.has()) {
            CONFIG.push();
        }

        RUNNER.runCommand('init');

    }
    // inspect configuration
    else {
        CONFIG.findCwd();

        // pull and run command
        if (CONFIG.has()) {
            CONFIG.pull();

            RUNNER.runCommand(command);

        }
        // must run initialize
        else {
            DOCS.show('run-init');
        }
    }
}
// show help
else {
    DOCS.show('usage');
}

