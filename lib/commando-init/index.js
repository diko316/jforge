'use strict';


var commando = require('../index');
var initialize = require('./initialize');

var register = commando.registerWorker;

register('init', initialize);
