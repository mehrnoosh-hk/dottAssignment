"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const problemSolveEngin_1 = require("../../src/utilities/problemSolveEngin");
describe('test problem solver engine', () => {
    const engine = new problemSolveEngin_1.SolverEngine('test/utilities/mockFile.txt');
    test('Initialize the engine', () => __awaiter(void 0, void 0, void 0, function* () {
        yield engine.initialize();
        expect(engine.numberOfProblems).toBe(2);
        expect(engine.dimentions).toEqual([[4, 4], [3, 3], [4, 3]]);
    }));
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
});
