
export class NearestWhitePixelProblem {

    // TODO: Create a class validator to check if the matrix is valid
    public matrix: number[][];
    public ones: number[][];
    constructor(matrix: number[][]) {
        this.matrix = matrix;
        this.ones = this.findWhitePixels();
    }

    // Find all white pixels, entries with value 1
    findWhitePixels() {
        const ones: number[][] = [];
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] === 1) {
                    ones.push([i, j]);
                }
            }
        }
        return ones;
    }

    // Find the nearest white pixels for each pixel 
    nearestWhitePixel() {
        const distanceMatrix: number[][] = this.matrix;
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                const distances = this.ones.map(one => {
                    return Math.abs(one[0] - i) + Math.abs(one[1] - j);
                })
                distanceMatrix[i][j] = Math.min(...distances);
            }
        }
        return distanceMatrix;
    }
}