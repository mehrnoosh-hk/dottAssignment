import { Engine } from "../../src/utilities/engine";

describe('Test engine class', () => {
    const engine = new Engine('mockFiles/mockFile.txt');

    test('Test construction of engine', () => {
        expect(engine).toBeDefined();
        expect(engine.filePath).toBe('mockFiles/mockFile.txt');
    });

    engine.createReadlineInterface();

    test('Test createReadlineInterface', () => {
        expect(engine.rl).toBeDefined();
        expect(engine.rl.length).toBe(1);
    });

    const brokenEngine = new Engine('../../mockFiles/brokenFile.txt');

    test('Test createReadlineInterface should throw error', () =>{
        expect(brokenEngine.createReadlineInterface).toThrow();
    });

    test('Test processLineByLine', async () => {
        const result = await engine.processLineByLine();
        console.log(result);
        // expect(engine.problemMatrices).toEqual(
        //     [
        //         [ [ 1, 1, 0, 1 ], [ 0, 0, 0, 0 ], [ 0, 1, 0, 1 ], [ 0, 0, 1, 0 ] ],
        //         [ [ 0, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ] ],
        //         [ [ 0, 0, 0, 0 ], [ 0, 0, 1, 0 ], [ 1, 0, 0, 1 ], [ 0, 1, 1, 0 ] ]
        //       ]
        // )
        expect(engine.numberOfProblems).toBe(3);
        expect(engine.solutionMatrices).toEqual(
            [
                [ [0, 0, 1, 0], [1, 1, 2, 1], [1, 0, 1, 0], [2, 1, 0, 1]],
                [[2, 1, 2], [1, 0, 1], [2, 1, 0]],
                [[2, 2, 1, 2], [1, 1, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1]]
            ]
        )
    });

})  