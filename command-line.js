#!/usr/bin/env node

'use strict';

var COMMANDO = require('./lib/index');
var RUNNER = require('./lib/runner');


require('./lib/commando-init');

RUNNER.run();
