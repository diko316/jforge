'use strict';


var jforge = require('../../lib');
var initialize = require('./initialize');

jforge.register('init')
    .runner(initialize);
