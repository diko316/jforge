'use strict';


var LIBCORE = require('libcore');
var CLI = require('../cli');
var WORKER = require('../worker');

var PROCESS = require('./process');
var PROCESSES = new (PROCESS.ProcessCollection)();
var string = LIBCORE.string;



function runCommand(name, options) {
    var Pwomise = Promise;
    var process;

    if (!string(name)) {
        return Pwomise.reject(new Error('Invalid runner [name] parameter.'));
    }

    if (!(options instanceof CLI.Option)) {
        return Pwomise.reject(new Error('Invalid runner [options] parameter.'));
    }

    process = PROCESSES.push(name, options);
    console.log(process);
    return Pwomise.resolve(process);
}

function extractCommand(option) {
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

// run steps
function runResolveCommand(option) {
    var params = extractCommand(option);

    if (!params) {
        return Promise.reject(new Error('Invalid Command Syntax.'));
    }

    return params;
}

function runExecuteCommand(params) {
    return runCommand(params[0], params[1]);
}

function run(option) {
    return Promise.resolve(option)

        .then(runResolveCommand)

        .then(runExecuteCommand);
    
}


module.exports = {
    run: run
};
