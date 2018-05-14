'use strict';

var registry = require('./registry');
var install = require('./install');

module.exports = {
    parse: registry.parse,
    resolve: registry.resolve,
    install: install.install,
    ensure: install.ensure
};
