'use strict';

var registry = require('./registry');

module.exports = {
    get: registry.get,
    register: registry.register
};
