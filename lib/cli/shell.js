'use strict';

var LIBCORE = require('libcore');
var READLINE = require('readline');
var string = LIBCORE.string;

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



module.exports = {
    prompt: prompt
};
