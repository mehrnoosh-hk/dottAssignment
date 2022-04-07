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

    const brokenEngine = new Engine('/home/mehrnoush/Documents/Programming/dottAssignment/test/utilities/brokenFile.txt');

    test('Test createReadlineInterface should throw error', () =>{
        expect(brokenEngine.createReadlineInterface).toThrow();
    });

    test('Test processLineByLine', async () => {
        const result = await engine.processLineByLine();
        expect(result).toEqual(
            [
                [ [ 1, 1, 0, 1 ], [ 0, 0, 0, 0 ], [ 0, 1, 0, 1 ], [ 0, 0, 1, 0 ] ],
                [ [ 0, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ] ],
                [ [ 0, 0, 0, 0 ], [ 0, 0, 1, 0 ], [ 1, 0, 0, 1 ], [ 0, 1, 1, 0 ] ]
              ]
        )
        expect(engine.numberOfProblems).toBe(3);
        
    });

})  