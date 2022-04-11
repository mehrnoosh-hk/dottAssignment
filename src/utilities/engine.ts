import {NearestWhitePixelProblem} from './nearestNode';
import {IValidatorService} from './classValidator';
import { IFileService } from './fileService';


/**
 * A class that manage all steps of reading, validation and sending the
 * problems to be solved and gather the results.
 */
export class Engine {

  /**
     * @property {IFileService} fs The file service interface.
     */
  public fs: IFileService;
  
  /**
     * @property {number[]} dimention The dimention of the current matrix
     * that engine works on.
     */
  public dimention: number[];
  /**
     * @property {number} endOfMatrix The line number containing the last row
     * of matrix.
     */
  public endOfMatrix: number;
  /**
     * @property {number[][]} matrix The matrix that engine works on.
     */
  public matrix: number[][];
  /**
     * @property {number[][][]} problemMatrices The matrix containing all
     * matrices of a test file.
     */
  public problemMatrices: number[][][];
  /**
     * @property {number[][][]} solutionMatrices The matrix contains all
     * solution matrices of a test file.
     */
  public solutionMatrices: number[][][];

  /**
     * An instance of Validation class.
     */
  public validator: IValidatorService;

  /**
     *
     * @param {number[]} dimention The dimention of the matrix that engine
     * works on.
     * @param {number} endOfMatrix The line number containing the last row
     * of matrix.
     */
  constructor(
    validator: IValidatorService,
    fileService: IFileService,
  ) {

    this.validator = validator;
    this.fs = fileService;
    this.dimention = [];
    this.endOfMatrix = 0;
    this.matrix = [];
    this.problemMatrices = [];
    this.solutionMatrices = [];
  }


  /**
   * This method is responsible for handling the validation of first line
   * of submitted test file and throw appropriate error if it is invalid.
   * @param {string} line The line to be processed.
   */
  numberOfProblemsHandler(line: string): void {
    const numberOfProblems = this.validator.isValidNumberOfProblems(line);
    if (numberOfProblems === 0) {
      throw new Error(`Invalid number of problems \
                      ${this.validator.isValidNumberOfProblems(line)}`);
    }
  }

  /**
   * This method is responsible for handling the validation of the line
   * containing the dimention of the matrix and throw appropriate error if
   * it is invalid.
   * @param {number} cursor The line number which is being processed.
   * @param {string} line The line to be processed.
   * @throws {Error} If the line is invalid.
    */
  dimentionHandler(cursor:number, line: string): void {
    const dimention = this.validator.isValidDimention(line);
    if (dimention.length > 0) {
      this.dimention = dimention;
      this.endOfMatrix = cursor + this.dimention[0];
    } else {
      throw new Error(`Invalid test case dimention: => "${line}"`);
    }
  }

  /**
   * This method is responsible for handling the validation of each line
   * of the matrix and throw appropriate error if it is invalid. If the line
   * is a valid row, it will be added to the matrix.
   * @param {number} cursor The line number which is being processed.
   * @param {string} line The line to be processed.
   * @throws {Error} If the line is invalid.
   */
  matrixHandler(cursor: number, line: string): void {
    const row = this.validator.isValidRow(line, this.dimention[1]);
    if (row.length > 0) {
      this.matrix.push(row);
    } else {
      throw new Error(`Invalid entry at line: ${cursor} => ${line}`);
    }
  }

  /**
   * This method is responsible for handling the process and validation of
   * the last line of the matrix and throw appropriate error if it is invalid.
   * If the line is a valid row, it will be added to the matrix. Then the
   * matrix will be added to the problemMatrices array.
   * Also the matrix will be sent to the NearestWhitePixelProblem class to
   * be solved.
   * @param {string} line The line to be processed.
   */
  endOfMatrixHandler(line: string): void {
    const row = this.validator.isValidRow(line, this.dimention[1]);
    if (row.length > 0) {
      this.matrix.push(row);
      this.problemMatrices.push(this.matrix);
      const solver = new NearestWhitePixelProblem(this.matrix);
      const solution = solver.nearestWhitePixel();
      this.solutionMatrices.push(solution);
      this.matrix = [];
    } else {
      throw new Error('Invalid row at line: ' + this.endOfMatrix);
    }
  }

  /**
   * This method is responsible for handling the process and validation of
   * next test case in submitted file.
   * The method checks if the line is a valid dimention line and throw
   * appropriate error if it is invalid. If the line
   * @param {number} cursor The line number which is being processed.
   * @param {string} line The line to be processed.
   * @throws {Error} If the line is invalid.
   */
  nextMatrixHandler(cursor:number, line: string): void {
    const dimention = this.validator.isValidDimention(line);
    if (dimention.length > 0) {
      this.dimention = dimention;
      this.endOfMatrix = cursor + this.dimention[0];
    } else {
      throw new Error('Invalid dimention at line: ' + cursor);
    }
  }

  /**
   * This method is responsible for handling the process of reading submitted
   * file line by line. This method keeps track of which line is being
   * processed and calls the appropriate handler method.
   * @param {number} cursor The line number which is being processed.
   * @param {string} line The line to be processed.
   */
  cursorHandler(cursor: number, line: string): void {
    if (cursor === 1) {
      this.numberOfProblemsHandler(line);
    } else if (cursor === 2) {
      this.dimentionHandler(cursor, line);
    } else if (cursor < this.endOfMatrix) {
      this.matrixHandler(cursor, line);
    } else if (cursor === this.endOfMatrix) {
      this.endOfMatrixHandler(line);
    } else {
      this.nextMatrixHandler(cursor, line);
    }
  }

  /**
   * This method is responsible for writing the solution to the file.
   */
  async writeResults() {
    

    for (const matrix of this.solutionMatrices) {
      const data = matrix.map((row) => row.join(' ')).join('\n');
      this.fs.write(data);
    }
  }


  /**
     * This method reads a test file line by line an send test matrices
     * to be solved accordingly.
     * @returns {Promise<number[][][]>} The promise of the matrix containing
     * all matrices of a test file.
     */
  async processLineByLine(): Promise<number[][][]> {

    if (!this.validator.isValidAddress) {
      throw new Error('Invalid file path');
    }
    let cursor = 0;
    for await (const line of this.fs.readline) {
      cursor ++;
      try {
        this.cursorHandler(cursor, line);
      } catch (error) {
        throw new Error(`Error while processing line ${cursor} ${error}`);
      }
    }
    await this.writeResults();
    return this.problemMatrices;
  }
}
