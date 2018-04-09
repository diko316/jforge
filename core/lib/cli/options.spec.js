var chai = require('chai');
var expect = chai.expect;
var OPTIONS = require('./options');
var RUNTIME_ARGUMENTS = ['node', 'cli.js'];

describe('Process CLI options', function () {

    it('Should process initial arguments.', function () {
        var Class = OPTIONS.Option;
        var instance;

        process.argv = RUNTIME_ARGUMENTS.concat([
            'initial'
        ]);

        instance = new Class({ before: 1 });

        expect(instance.argumentsBefore).to.have.members(['initial']);

        process.argv = RUNTIME_ARGUMENTS.concat([
            'initial',
            'next'
        ]);

        instance = new Class({ before: 1 });

        expect(instance.argumentsBefore).to.have.members(['initial']);

        instance = new Class({ before: 2 });

        expect(instance.argumentsBefore).to.have.members(['initial', 'next']);
    });

    it('Should process options.', function () {
        var Class = OPTIONS.Option;
        var instance;

        process.argv = RUNTIME_ARGUMENTS.concat([
            '--test',
            'initial'
        ]);

        instance = new Class({ options: { '-test': 0 } });

        expect(instance.options).to.include({ '-test': true });

        process.argv = RUNTIME_ARGUMENTS.concat([
            '--test',
            'initial'
        ]);

        instance = new Class({ options: { '-test': 1 } });

        expect(instance.options['-test']).to.have.members(['initial']);

        process.argv = RUNTIME_ARGUMENTS.concat([
            '--test',
            'initial'
        ]);

        instance = new Class({
                                options: { '-test': 0 },
                                after: 1
                            });
        expect(instance.options).to.include({ '-test': true });
        expect(instance.arguments).to.have.members(['initial']);
    });


    it('Should process arguments.', function () {
        var Class = OPTIONS.Option;
        var instance;

        process.argv = RUNTIME_ARGUMENTS.concat([
            '--test',
            'initial'
        ]);

        instance = new Class({ after: 1 });

        expect(instance.arguments).to.have.members(['--test']);

        process.argv = RUNTIME_ARGUMENTS.concat([
            '--test',
            'initial'
        ]);

        instance = new Class({ after: 2 });

        expect(instance.arguments).to.have.members(['--test', 'initial']);

    });

    it('Should cascade process commandline arguments.', function () {
        var Class = OPTIONS.Option;
        var instance;

        process.argv = RUNTIME_ARGUMENTS.concat([
            'init',
            '--strict', 'true',
            'my-package'
        ]);

        instance = new Class({ after: 1 });

        expect(instance.arguments).to.have.members(['init']);

        instance = instance.next({
                                    options: { '-strict': 1 },
                                    after: 1
                                });

        expect(instance.options).to.deep.equal({ '-strict': ['true'] });
        expect(instance.arguments).to.have.members(['my-package']);
    });
});
