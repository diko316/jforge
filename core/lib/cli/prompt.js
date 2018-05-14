'use strict';

var LIBCORE = require('libcore');
var READLINE = require('readline');
var PROCESSOR = require('./processor');
var string = LIBCORE.string;
var object = LIBCORE.object;

function prompt(message) {
    var nodeProcess = process;
    var cli = null;

    if (message === null || typeof message === 'undefined') {
        message = "";
    }

    if (string(message, true)) {
        cli = READLINE.createInterface({
            input: nodeProcess.stdin,
            output: nodeProcess.stdout
        });

        return new Promise(function (resolve) {
            cli.question(message,
                        function (answer) {
                            resolve(answer);
                            cli.close();
                            cli = null;
                        });
        });
    }

    return Promise.reject(new Error("Invalid message parameter."));
}


function processorMessage(message) {
    var text = message.text;

    if (!string(text)) {
        text = '';
    }

    return prompt(text);
}

// create processor
PROCESSOR
    .resolve('prompt')
    .guard(object)
    .handler(processorMessage)



module.exports = prompt;
