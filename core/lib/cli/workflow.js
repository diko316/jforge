'use strict';

var CONFIG = require('../config');

/**
 * Inspect if configuration exists
 */
function inspectConfiguration() {
    console.log('path: ', CONFIG.useDirectory());
}



module.exports = {
    inspectConfig: inspectConfiguration
};
