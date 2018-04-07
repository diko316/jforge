'use strict';

var cli = require('./lib/cli');
var options, params, command;

function start(command, options) {
    // ensure it's ready
    if (command !== 'init') {

        if (!cli.hasCurrentConfig()) {
            console.error('no config found please run ' + cli.command + ' init');
            return false;
        }

    }
    
    console.log('running command ', command);
}

// register commando-init
require('./lib/commando-init');

// run command
options = cli.arguments({ before: 1 });
params = options.argumentsBefore;

if (params) {
    command = params[0];
    start(command, options);
}
