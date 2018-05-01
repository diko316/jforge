'use strict';


var jforge = require('jforge');
var config = require('../config');

function createConfigFile() {
    var file = config.configFile;

    if (!jforge.isFile(file, 'rw') && !jforge.writeFile(file, '')) {
        jforge.logError('Unable to write to config file ' + file);

        return Promise.reject(
                    new Error('Unable to write to config file ' + file)
                );
    }

    if (!jforge.isFile(file, 'rw')) {
        return Promise.reject(
            new Error('Unable to access config file ' + file)
        );
    }

    return Promise.resolve(file);
}

module.exports = createConfigFile;


