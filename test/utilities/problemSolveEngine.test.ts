import { SolverEngine } from "../../src/utilities/problemSolveEngin";

describe('test problem solver engine', () => {

    const engine = new SolverEngine('test/utilities/mockFile.txt');

    test('Initialize the engine', async () => {
        await engine.initialize();
        expect(engine.numberOfProblems).toBe(2);
        expect(engine.dimentions).toEqual([[4, 4], [3, 3], [4, 3]]);
    });

    // test('Read all problem case matrices', () => {
    //     engine.readMatrix();
    //     expect(engine.allMatrices[0]).toEqual([
    //         [
    //             [1, 1, 0, 1],
    //             [0, 0, 0, 0],
    //             [0, 1, 0, 1],
    //             [0, 0, 1, 0]
    //         ]
    //     ]);
    // });
})