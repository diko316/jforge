'use strict';

var worker = require('./worker');

module.exports = {
    registerWorker: worker.register
};
