'use strict';

var LIBCORE = require('libcore');
var FS = require('fs');
var PATH = require('path');

var fullpath = require('./path').fullpath;

var array = LIBCORE.array;
var string = LIBCORE.string;
var traceSplitRe = /\s+/;
var traceMatch = ['readable', 'writable', 'file'];

function exist(path) {
    var fs = FS;
    var constants = fs.constants;
    var stat;

    path = fullpath(path);

    try {
        stat = fs.statSync(path);
        stat = {
            path: path,
            isBlock: stat.isBlockDevice(),
            isCharacter: stat.isCharacterDevice(),
            isDirectory: stat.isDirectory(),
            isFile: stat.isFile(),
            isLink: stat.isSymbolicLink(),
            isFifo: stat.isFIFO(),
            isSocket: stat.isSocket(),
            isReadable: false,
            isWritable: false,
            isExecutable: false,
            umode: (stat.mode & 0xfff).toString(8) * 1,
            stat: stat
        };
    }
    catch (e) {
        return false;
    }

    try {
        fs.accessSync(path, constants.R_OK);
        stat.isReadable = true;
    }
    catch (e) {
        // not readable
    }

    try {
        fs.accessSync(path, constants.W_OK);
        stat.isWritable = true;
    }
    catch (e) {
        // not writable
    }

    try {
        fs.accessSync(path, constants.X_OK);
        stat.isExecutable = true;
    }
    catch (e) {
        // not executable
    }

    return stat;
}

function is(file, isList) {
    var isArray = array;
    var c, length, isValue, compare;

    file = exist(file);
    if (file) {
        if (arguments.length < 2) {
            return true;
        }

        if (string(isList)) {
            isList = isList.split(traceSplitRe);
        }

        if (isArray(isList)) {
            length = isList.length;

            loop: for (; length--; c++) {
                switch (isValue) {
                case 'block':
                case 'b':
                        compare = file.isBlock;
                        break;
                case 'not-block':
                case 'nb':
                        compare = !file.isBlock;
                        break;

                case 'character':
                case 'char':
                case 'c':
                        compare = file.isCharacter;
                        break;

                case 'not-character':
                case 'not-char':
                case 'nc':
                        compare = !file.isCharacter;
                        break;

                case 'directory':
                case 'dir':
                case 'd':
                        compare = file.isDirectory;
                        break;

                case 'not-directory':
                case 'not-dir':
                case 'nd':
                        compare = !file.isDirectory;
                        break;

                case 'file':
                case 'f':
                        compare = file.isFile;
                        break;

                case 'not-file':
                case 'nf':
                        compare = !file.isFile;
                        break;

                case 'link':
                        compare = file.isLink;
                        break;

                case 'not-link':
                        compare = !file.isLink;
                        break;

                case 'fifo':
                        compare = file.isFifo;
                        break;

                case 'not-fifo':
                        compare = !file.isFifo;
                        break;

                case 'socket':
                        compare = file.isSocket;
                        break;

                case 'not-socket':
                        compare = !file.isSocket;
                        break;

                case 'readable':
                case 'r':
                        compare = file.isReadable;
                        break;

                case 'not-readable':
                case 'nr':
                        compare = !file.isReadable;
                        break;

                case 'writable':
                case 'w':
                        compare = file.isWritable;
                        break;

                case 'not-writable':
                case 'nw':
                        compare = !file.isWritable;
                        break;

                case 'executable':
                case 'x':
                        compare = file.isExecutable;
                        break;

                case 'not-executable':
                case 'nx':
                        compare = !file.isExecutable;
                        break;

                default:
                    continue loop;
                }

                if (!compare) {
                    return false;
                }
            }

            return true;
        }
    }

    return false;
}


function tracefile(directory, file, matcher) {
    var path = PATH;
    var isString = string;
    var fileIs = is;
    var argLength = arguments.length;
    var workingDirectory = process.cwd();
    var before, current;

    // finalize arguments
    if (argLength < 3) {
        if (isString(file)) {
            matcher = traceMatch;
        }
        else {
            file = directory;
            matcher = file;
            directory = workingDirectory;
        }
    }

    if (!isString(file)) {
        throw new Error('Invalid "file" parameter.');
    }

    // finalize files and directories
    if (path.isAbsolute(file)) {
        before = file;
        directory = path.dirname(before);
        file = path.basename(before);
    }
    else if (!isString(directory, true)) {
        throw new Error('Invalid "directory" parameter');
    }
    else {
        if (!path.isAbsolute(directory)) {
            directory = path.join(workingDirectory, directory);
        }
        before = path.resolve(directory, file);
    }

    // resolve!
    if (file) {
        if (!array(matcher)) {
            throw new Error('Invalid "matcher" parameter');
        }

        for (; directory !== before; directory = path.dirname(directory)) {
            before = directory;
            current = path.resolve(directory, file);

            if (fileIs(current, matcher)) {
                return current;
            }
        }
    }

    return false;
}

module.exports = {
    exist: exist,
    tracefile: tracefile,
    is: is
};
