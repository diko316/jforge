'use strict';

var REGISTRY = require('./registry');
var PROCESS = require('./process');


module.exports = {
    register: REGISTRY.register,
    exist: REGISTRY.exist,
    get: REGISTRY.get,
    create: PROCESS.create
};
