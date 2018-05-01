'use strict';


var jforge = require('jforge');
var PATH = require('path');
var config = require('../config');
var runnerFile = config.runnerFile;
var originRunnerFile = PATH.join(
                            PATH.dirname(__dirname),
                            'runner.js'
                        );

function createRunnerFile() {
    var file = runnerFile;
    var result;

    if (!jforge.isFile(file, 'rw')) {
        result = jforge.writeFile(
                    file,
                    jforge.readFile(originRunnerFile)
                );

        if (!result) {
            jforge.logError('Unable to write to runner file ' + file);

            return Promise.reject(
                        new Error('Unable to write to runner file ' + file)
                    );
        }
    }

    if (!jforge.isFile(file, 'rw')) {
        return Promise.reject(
            new Error('Unable to access runner file ' + file)
        );
    }

    return Promise.resolve(file);
}

module.exports = createRunnerFile;


