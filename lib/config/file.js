'use strict';

var LIBCORE = require('libcore');
var PATH = require('path');
var FS = require('fs');
var FILE = require('../file');


var MANIFEST = require('./manifest');

var string = LIBCORE.string;

function getConfigDirectory(directory) {
    var path = PATH;
    var is = FILE.is;
    var target = MANIFEST.configDirectoryName;
    var before = '.';
    var fullPath;

    if (!string(directory)) {
        throw new Error('Invalid [directory] parameter.');
    }

    for (; directory !== before; directory = path.dirname(directory)) {
        before = directory;
        fullPath = path.join(directory, target);

        if (is(fullPath, 'directory readable writable')) {
            return fullPath;
        }
    }

    return false;
}

function createDirectory(directory) {
    var fullPath;

    if (!string(directory)) {
        throw new Error('Invalid [directory] parameter.');
    }

    fullPath = PATH.join(directory, MANIFEST.configDirectoryName);

    if (!FILE.is(directory, 'directory readable writable')) {
        throw new Error('No access or Directory do not exist: ' + directory);
    }

    FS.mkdirSync(fullPath);

    return fullPath;
}

function createFile(directory) {
    var path = PATH;
    var file = FILE;
    var manifest = MANIFEST;
    var configDirectory;
    var configFile;

    if (!string(directory)) {
        throw new Error('Invalid [directory] parameter.');
    }

    // try creating directory
    configDirectory = path.join(directory, manifest.configDirectoryName);
    if (!file.is(configDirectory, 'directory readable writable')) {
        configDirectory = createDirectory(directory);
    }

    // apply config defaults
    configFile = path.join(configDirectory, manifest.configFileName);
    if (!file.is(configFile, 'file')) {
        FS.writeFileSync(configFile,
                        '{}',
                        manifest.fileWriteOption);
    }

    if (!file.is(configFile, 'file readable writable')) {
        throw new Error('No permission to access file. ' + configFile);
    }

    return configFile;
}

function fileInfo() {
    var manifest = MANIFEST;
    var configPath = manifest.configPath;
    var file = FILE;
    var currentDirectory = process.cwd();
    var configDirectory;

    // detect
    if (!configPath) {
        configDirectory = getConfigDirectory(currentDirectory);
        configPath = configDirectory ?
                            PATH.join(configDirectory,
                                    manifest.configFileName
                            ) :
                            createFile(currentDirectory);
        manifest.configPath = configPath;
    }

    if (!file.is(configPath, 'file readable writable')) {
        throw new Error('No permission or file do not exist. ' + configPath);
    }

    return configPath;
}

function push() {
    var manifest = MANIFEST;
    var configPath = fileInfo();


    FS.writeFileSync(
        configPath,
        JSON.stringify(manifest.config),
        manifest.fileWriteOption
    );

    return configPath;
}

function pull() {
    var manifest = MANIFEST;
    var configPath = fileInfo();
    var content;

    content = FS.readFileSync(
                configPath,
                manifest.fileReadOption
            );

    try {
        content = JSON.parse(content);
    }
    catch (error) {
        throw error;
    }

    manifest.config = content;

    return configPath;
}



module.exports = {
    fileInfo: fileInfo,
    push: push,
    pull: pull
};
