import { NearestWhitePixelProblem } from '../src/nearestNode';


test('class constructor', () => {
    const testproblem = new NearestWhitePixelProblem([
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 1, 0]
    ]);
    expect(testproblem.matrix).toEqual([
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 1, 0]
    ]);
})


test('findWhitePixels', () => {
    const testproblem = new NearestWhitePixelProblem([
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 1, 0]
    ]);
    expect(testproblem.findWhitePixels()).toEqual([
        [0, 3],
        [1, 2],
        [1, 3],
        [2, 1],
        [2, 2],
    ]);
});