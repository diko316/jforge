'use strict';

var yaml = require('js-yaml');
var fs = require('../file');
var file = require('./file');
var directory = require('./directory');
var definition = null;

function useDirectory(root) {
    var configObject = file.ensureConfigFile(root);
    var data = null;

    if (configObject) {
        try {
            data = yaml.load(fs.readFile(configObject.file));
        }
        catch (error) {
            console.error(error);
            return false;
        }

        definition = configObject;
        configObject.data = data;

        console.log('config!', data);

        return configObject.root;
    }

    return false;
}



module.exports = {
    useDirectory: useDirectory
};
