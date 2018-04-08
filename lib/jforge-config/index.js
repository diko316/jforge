'use strict';


var commando = require('../index');
var configureGuard = require('./configure.guard');
var configureRunner = require('./configure.runner');

commando.register('config')
    .guard(configureGuard)
    .runner(configureRunner);
