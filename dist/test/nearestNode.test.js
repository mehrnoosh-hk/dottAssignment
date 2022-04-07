"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nearestNode_1 = require("../src/nearestNode");
// TODO: Check for needed mock objects
test('class constructor', () => {
    const testproblem = new nearestNode_1.NearestWhitePixelProblem([
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
    ]);
    expect(testproblem.matrix).toEqual([
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
    ]);
});
test('Find all white pixels', () => {
    const testproblem = new nearestNode_1.NearestWhitePixelProblem([
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
    ]);
    expect(testproblem.findWhitePixels()).toEqual([
        [0, 3],
        [1, 2],
        [1, 3],
        [2, 1],
        [2, 2],
    ]);
});
test('Find the nearest white pixels for each pixel', () => {
    const testproblem = new nearestNode_1.NearestWhitePixelProblem([
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
    ]);
    expect(testproblem.nearestWhitePixel()).toEqual([
        [3, 2, 1, 0],
        [2, 1, 0, 0],
        [1, 0, 0, 1],
    ]);
});
