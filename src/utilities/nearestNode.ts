/**
 * A class that represent a "Find nearest white pixel" problem
 */
export class NearestWhitePixelProblem {
  // TODO: Create a class validator to check if the matrix is valid
  /**
   * Matrix representation of a bitmap
   */
  public matrix: number[][];
  // TODO: Convert to readonly?

  /**
   * Matrix representation of white pixels in a bitmap
   */
  public ones: number[][];

  /**
   * Initialize an instance of NearestWhitePixelProblem class.
   * @param {number[][]} matrix The matrix representation of a bitmap.
   */
  constructor(matrix: number[][]) {
    this.matrix = matrix;
    this.ones = this.findWhitePixels();
  }

  /**
   * Find all white pixels in bitmap
   * @returns {number[][]} The matrix representation of all white pixels in a
   * bitmap.
   */
  findWhitePixels(): number[][] {
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

  /**
   * Find the nearest white pixel to the given pixel.
   * @returns {number[][]} The nearest white pixel to the given pixel in a
   * bitmap matrix.
   */
  nearestWhitePixel(): number[][] {
    const distanceMatrix: number[][] = this.matrix;
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