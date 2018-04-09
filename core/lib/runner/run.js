'use strict';


var LIBCORE = require('libcore');
var CLI = require('../cli');
var WORKER = require('../worker');

var PROCESS = require('./process');
var PROCESSES = new (PROCESS.ProcessCollection)();
var string = LIBCORE.string;



function runCommand(name) {
    var Pwomise = Promise;
    var process;

    if (!string(name)) {
        return Pwomise.reject(new Error('Invalid runner [name] parameter.'));
    }

    process = PROCESSES.run(name);

    return Pwomise.resolve(process);
}

function extractCliOptions(option) {
    var cli = CLI;
    var create = cli.arguments;
    var newOption, params;

    if (option !== null && typeof option !== 'undefined') {
        if (!(option instanceof cli.Option)) {
            throw new Error('Invalid Command [option] parameter');
        }

        newOption = option.next({ before: 1 });
    }
    else {
        newOption = create({ before: 1 });
    }

    params = newOption.argumentsBefore;

    return params ? [params[0], newOption] : null;
}


module.exports = {
    runCommand: runCommand,
    extractCliOptions: extractCliOptions
};
