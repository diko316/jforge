#!/usr/bin/env node

'use strict';

var COMMANDO = require('./lib/index');
var RUNNER = require('./lib/runner');


require('./lib/jforge-init');

RUNNER.run();
