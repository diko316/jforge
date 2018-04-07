'use strict';

var PATH = require('path');
var FILE = require('../file');
var CWD = process.cwd();
var pathConfig = {
        root: CWD,
        relativeDirectory: '.commando',
        runnerFile: 'runner.json'
    };

var rootPath, parent;

function getCurrentRoot() {
    var config = pathConfig;
    return PATH.join(config.root, config.relativeDirectory);
}

function getRunnerFile(root) {
    return PATH.join(root, pathConfig.runnerFile);
}

function resolveParent() {
    var config = pathConfig;

    return FILE.tracePath(
                config.relativeDirectory,
                config.root,
                'directory'
            ) || null;
}

rootPath = getCurrentRoot();
parent = resolveParent();

module.exports = {
    path: pathConfig,
    root: rootPath,
    runner: getRunnerFile(rootPath),
    parent: parent,
    parentRunner: parent ? getRunnerFile(parent) : null,
    cli: process.argv[1]
};
