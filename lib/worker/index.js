'use strict';

var registry = require('./registry');
var Base = require('./base');

module.exports = {
    Base: Base,
    register: registry.register,
    get: registry.get
};
