'use strict';

var registry = require('./registry');

module.exports = {
    register: registry.register,
    get: registry.get
};
