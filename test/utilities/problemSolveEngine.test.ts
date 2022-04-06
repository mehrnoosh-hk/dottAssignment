import { SolverEngine } from "../../src/utilities/problemSolveEngin";

describe('test problem solver engine', () => {
    const engine = new SolverEngine('test/utilities/mockFile.txt');

    test('Read the number of problems', () => {
        engine.setNumberOfProblems();
        expect(engine.numberOfProblems).toBe(2);
    });

    test('Read dimentions of all problem case matrices', () => {
        engine.setDimentionsofProblems();
        expect(engine.dimentions).toEqual([[4, 4], [3, 3], [4, 3]]);
    });

    test('Read all problem case matrices', () => {
        engine.readMatrix();
        expect(engine.allMatrices[0]).toEqual([
            [
                [1, 1, 0, 1],
                [0, 0, 0, 0],
                [0, 1, 0, 1],
                [0, 0, 1, 0]
            ]
        ]);
    });
})