"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NearestWhitePixelProblem = void 0;
/**
 * A class that represent a "Find nearest white pixel" problem
 */
class NearestWhitePixelProblem {
    /**
     * Initialize an instance of NearestWhitePixelProblem class.
     * @param {number[][]} matrix The matrix representation of a bitmap.
     */
    constructor(matrix) {
        this.matrix = matrix;
        this.ones = this.findWhitePixels();
    }
    /**
     * Find all white pixels in bitmap
     * @returns {number[][]} The matrix representation of all white pixels in a
     * bitmap.
     */
    findWhitePixels() {
        const ones = [];
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] === 1) {
                    ones.push([i, j]);
                }
            }
        }
        return ones;
    }
    /**
     * Find the nearest white pixel to the given pixel.
     * @returns {number[][]} The nearest white pixel to the given pixel in a
     * bitmap matrix.
     */
    nearestWhitePixel() {
        const distanceMatrix = this.matrix;
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                const distances = this.ones.map((one) => {
                    return Math.abs(one[0] - i) + Math.abs(one[1] - j);
                });
                distanceMatrix[i][j] = Math.min(...distances);
            }
        }
        return distanceMatrix;
    }
}
exports.NearestWhitePixelProblem = NearestWhitePixelProblem;
// const np = new NearestWhitePixelProblem(
//   [
//     [0, 0, 0, 0],
//     [0, 0, 1, 0],
//     [1, 0, 0, 1],
//     [0, 1, 1, 0],
//   ]
// )
// console.log(np.nearestWhitePixel());
// console.log(np.ones);
