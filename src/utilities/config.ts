/**
 * This class is ablue print of a file config object.
 */
export class FileConfig {
  /**
   * @param {string} filePath The path of the file to be read.
   */
  public filePath: string;

  /**
   * @property {number} maxNumberOfProblems The maximum number of problems
   */
  public maxNumberOfProblems: number;

  /**
   * @property {number} validDimention The valid dimention of the matrix.
   */
  public validDimention: number;

  /**
   * @property {string} dimentionSeperator The seperator of the dimention.
   */
  public dimentionSeperator: string;

  /**
   * @property {string} rowElementSeperator The seperator of the row elements.
   */
  public rowElementSeperator: string;

  /**
   * @property {string} resultSeperator The seperator of matrix elements of
   * solution.
   */
  public resultSeperator: string;

  /**
   * @property {string} testCaseSeperator The seperator of test cases.
   */
  public testCaseSeperator: string;

  /**
   * Constructor of the FileConfig class.
   * @param {string} filePath The path of the file to be read.
   * @param {number} maxNumberOfProblems
   * @param {number} validDimention
   * @param {string} dimentionSeperator
   * @param {string} rowElementSeperator
   * @param {string} resultSeperator
   * @param {string} testCaseSeperator
   */
  constructor(
      filePath: string = './mockFiles/mockFile.txt',
      maxNumberOfProblems: number = 1000,
      validDimention: number = 182,
      dimentionSeperator: string = ' ',
      rowElementSeperator: string = '',
      resultSeperator: string = ' ',
      testCaseSeperator: string = '\n',
  ) {
    this.filePath = filePath;
    this.maxNumberOfProblems = maxNumberOfProblems;
    this.validDimention = validDimention;
    this.dimentionSeperator = dimentionSeperator;
    this.rowElementSeperator = rowElementSeperator;
    this.resultSeperator = resultSeperator;
    this.testCaseSeperator = testCaseSeperator;
  }
}
