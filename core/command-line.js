#!/usr/bin/env node

'use strict';

var CLI = require('./lib/cli');

/**
 *  Step 1 - Inspect command
 */
function inspectCommand() {
    var command = CLI.arguments({ before: 1 }).beforeString();

    console.log('command ', command);
}


inspectCommand();