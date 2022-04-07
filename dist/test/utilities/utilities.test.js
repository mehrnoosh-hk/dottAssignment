"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("../../src/utilities/utilities");
const readline = __importStar(require("readline"));
// Test for create readline interface
describe('Test implementation of Utils class', () => {
    const util = new utilities_1.Utils('test/utilities/mockFile.txt');
    test('Create a readline interface', () => {
        expect(util.rl).toBeDefined();
    });
    test('There is only one instance of readline interface', () => {
        expect(util.rl.length).toBe(1);
    });
    test('The rl property is an instance of readline interface', () => {
        expect(util.rl[0]).toBeInstanceOf(readline.Interface);
    });
    test('Read first line of file', () => {
        expect(util.readNthLine(1)).resolves.toBe('2');
    });
    test('Read the third line of file', () => {
        expect(util.readNthLine(3)).resolves.toBe('1101');
    });
    test('Read the number of problems', () => {
        expect(util.readNumberOfProblems()).resolves.toBe(2);
    });
});
// TODO: Add test for invalid file path
// TODO: Add test for invalid line number
// TODO: Add test for close readline interface
// TODO: A worker process has failed to exit gracefully and has been force
// exited. This is likely caused by tests leaking due to improper teardown.
// Try running with --detectOpenHandles to find leaks.
// Active timers can also cause this, ensure that .unref()
// was called on them.
