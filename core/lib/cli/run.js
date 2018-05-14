'use strict';

var PATH = require('path');
var CONFIG = require('../config');
var RUN = require('../run');
var PACKAGE = require('../package');
var EVENT = require('./events');
var PACKAGE_DIR = PATH.dirname(require.main.filename);

function run(command, options) {
    var packageName = 'jforge-' + command;
    var rootDir = PACKAGE_DIR;
    var params = options.getRemaining();

    return PACKAGE.ensure(packageName)
            .then(function(name) {

                params.splice(0, 0, name);

                // run
                return RUN.scriptRun(
                    PATH.join(rootDir, 'package-run.js'),
                    params,
                    {
                        cwd: rootDir,
                        message: EVENT.handler
                    }
                );
            });

}



module.exports = run;