import * as fs from 'fs';
import { FileConfig } from './config';

/**
 * Interface for the validator service.
 */
export interface IValidatorService {
  isValidAddress(): boolean;
  isValidNumberOfProblems(value: string): number;
  isValidDimention(value: string): number[];
  isValidRow(value:string, nOfColumns: number): number[];
}


/**
 * Validation class contains all methods to validate the input file.
 * All parameters have a default value to determain how the validation
 * will be done. unless the user specifies otherwise.
 */
export class Validation implements IValidatorService {

  /**
   * @property {FileConfig} fileConfig The configuration of the submitted problem file.
   */
  public config:FileConfig;


  /**
     * constructor of the class Validator
     * @param {FileConfig} config The configuration of the submitted problem file. 
     */
  constructor (config: FileConfig) {
    this.config = config;
  }

  /**
   * Check if the file path is valid and the file exists
   * @return {boolean}
   */
  isValidAddress(): boolean {
    return fs.existsSync(this.config.filePath);
  }

  /**
   * Checks if the number of problems in the submitted file is valid according
   * to the validNumberOfProblems property
   * @param {string}value The number of problems in the submitted file
   * @return {number} The number of problems in the submitted file
   * if it is valid otherwise 0
   */
  isValidNumberOfProblems(value: string): number {
    if (Number(value) <= this.config.maxNumberOfProblems && Number(value) > 0 &&
            Number(value) % 1 === 0) {
      return Number(value);
    }
    return 0;
  }


  /**
     * Check if the string can be converted to number and
     * its value is less than or equal 182
     * @param {string} value
     * @return {number | boolean}
     */
  isValidDimention(value: string): number[] {
    const dimention: number[] = value.split(this.config.dimentionSeperator)
        .map(Number);
    if (dimention.every((element) => element !== NaN) &&
        dimention.every((element) =>
          element <= this.config.validDimention && element > 0 &&
        dimention.length === 2)) {
      return dimention;
    }
    return [];
  }

  /**
     * Check if the string can be converted to a binary array with
     * proper length.
     * return converted array if the string is a binary array
     * @param {string} value
     * @param {number} cols the columns number of the matrix
     * @return {number[] | boolean}
     */
  isValidRow(value: string, cols: number): number[] {
    const row = value.split(this.config.rowElementSeperator).map(Number);
    if (row.every((element) => element === 0 || element === 1) &&
            row.length === cols) {
      return row;
    }
    return [];
  }
}
