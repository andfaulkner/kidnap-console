/// <reference path="../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />

// Ensure environment knows testing is occurring.
process.env.mocha = true;

// Store original process.argv.
const oldProcArgs = Object.assign({}, process.argv);

/************************************** THIRD-PARTY IMPORTS ***************************************/
import { expect } from 'chai';
import * as sinon from 'sinon';

import * as fs from 'fs';
import * as path from 'path';
import { stderr, stdout } from 'test-console';

/*********************************** IMPORT FILES TO BE TESTED ************************************/
import { blockLogOutput, kidnapConsole } from '../index';


/******************************************** HELPERS *********************************************/
function logThings() {
    console.dir('hello dir');
    console.log('hello log');
    console.warn('hello warn');
    console.error('hello error');
    return 'my return value';
}

/**
 * Demonstrate that blockLogOutput
 */



/********************************************* TESTS **********************************************/
describe('blockLogOutput', function() {
    it('exists', function() {
        expect(blockLogOutput).to.exist;
    });

    it('has an alias: kidnapConsole', function() {
        expect(kidnapConsole).to.exist;
        expect(kidnapConsole).to.eql(blockLogOutput);
    });

    it('captures return value of any function it wraps, in result param of return obj', function() {
        const fnThatReturnsAValue = () => 'my return value';

        const capturedLogs = blockLogOutput(() => fnThatReturnsAValue());
        expect(capturedLogs.result).to.exist;
        expect(capturedLogs.result).to.eql(fnThatReturnsAValue());
    });

    it('contains a set of storage arrays for catching console method terminal outputs', function() {
        const capturedLogs = blockLogOutput(() => logThings());
        expect(capturedLogs.stores).to.exist;

        expect(capturedLogs.stores.dir).to.exist;
        expect(capturedLogs.stores.log).to.exist;
        expect(capturedLogs.stores.warn).to.exist;
        expect(capturedLogs.stores.error).to.exist;

        expect(capturedLogs.stores.dir).to.be.an('array');
        expect(capturedLogs.stores.log).to.be.an('array');
        expect(capturedLogs.stores.warn).to.be.an('array');
        expect(capturedLogs.stores.error).to.be.an('array');
    });

    it('captures log output of anything it wraps', function() {
        const capturedLogs = blockLogOutput(() => logThings());
        expect(capturedLogs.stores.log[0]).to.be.string('hello log');
        expect(capturedLogs.stores.dir[0]).to.be.string('hello dir');
        expect(capturedLogs.stores.warn[0]).to.be.string('hello warn');
        expect(capturedLogs.stores.error[0]).to.be.string('hello error');
    });

    /**
     * Restore original process.argv.
     */
    after(function() {
        process.argv = Object.assign({}, oldProcArgs);
    });
});
