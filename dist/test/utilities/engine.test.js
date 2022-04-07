"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("../../src/utilities/engine");
describe('Test engine class', () => {
    const engine = new engine_1.Engine('/home/mehrnoush/Documents/Programming/dottAssignment/test/utilities/mockFile.txt');
    test('Test construction of engine', () => {
        expect(engine).toBeDefined();
        expect(engine.filePath).toBe('/home/mehrnoush/Documents/Programming/dottAssignment/test/utilities/mockFile.txt');
    });
    engine.createReadlineInterface();
    test('Test createReadlineInterface', () => {
        expect(engine.rl).toBeDefined();
        expect(engine.rl.length).toBe(1);
    });
});
