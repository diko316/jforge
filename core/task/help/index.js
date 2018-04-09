'use strict';


var jforge = require('../../lib');
var runner = require('./runner');


jforge.register('help')
    .runner(runner);