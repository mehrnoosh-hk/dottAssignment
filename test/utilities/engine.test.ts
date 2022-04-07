import { Engine } from "../../src/utilities/engine";

describe('Test engine class', () => {
    const engine = new Engine('/home/mehrnoush/Documents/Programming/dottAssignment/test/utilities/mockFile.txt');

    test('Test construction of engine', () => {
        expect(engine).toBeDefined();
        expect(engine.filePath).toBe('/home/mehrnoush/Documents/Programming/dottAssignment/test/utilities/mockFile.txt');
    });

    engine.createReadlineInterface();

    test('Test createReadlineInterface', () => {
        expect(engine.rl).toBeDefined();
        expect(engine.rl.length).toBe(1);
    });
})