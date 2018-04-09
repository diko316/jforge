'use strict';


var commando = require('../index');
var runner = require('./runner');


commando.register('help')
    .runner(runner);