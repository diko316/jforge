'use strict';


var commando = require('../index');
var initialize = require('./initialize');

commando.register('init')
    .runner(initialize);
