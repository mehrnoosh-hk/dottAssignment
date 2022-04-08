import * as fs from 'fs';                                                                                                                                       
/**
 * Validation class contains all methods to validate the input file.
 * All parameters have a default value to determain how the validation will be done 
 * unless the user specifies otherwise.
 */
export class Validation {

    public filePath: string;

    /**
     * @property {number} This property shows the acceptable number of problems
     */
    public validNumberOfProblems: number;
    /**
     * @property {number} This property shows the acceptable dimention of the matrix
     */
    public validDimention: number;
    /**
     * @property {string} This property shows the seperator of the dimentions of the matrix in test file
     */
    public dimentionSeperator: string;
    /**
     * @property {string} This property shows the seperator of the row elements in test file
     */
    public rowElementSeperator: string;


    /**
     * constructor of the class Validator
     * @param validNumberOfProblems 
     * @param validDimention 
     * @param dimentionSeperator 
     * @param rowElementSeperator 
     */
    constructor(filepath: string,
                validNumberOfProblems: number = 1000, 
                validDimention: number = 182, 
                dimentionSeperator: string = " ", 
                rowElementSeperator: string = "") {
        this.filePath = filepath;
        this.validNumberOfProblems = validNumberOfProblems;
        this.validDimention = validDimention;
        this.dimentionSeperator = dimentionSeperator;
        this.rowElementSeperator = rowElementSeperator;
    }

    isValidAddress(): boolean {
        return fs.existsSync(this.filePath)  
    }

    isValidNumberOfProblems(value: string): number  {
        if (Number(value) <= this.validNumberOfProblems && Number(value) > 0 && 
            Number(value) % 1 === 0) {
            return Number(value);
        }
        return 0;
    }


    /**
     * Check if the string can be converted to number and
     * its value is less than or equal 182
     * @param {string} value
     * @returns {number | boolean}
     */
    isValidDimention(value: string): number[] {
        const dimention: number[] = value.split(this.dimentionSeperator).map(Number);
        if (dimention.every(element => element !== NaN) &&
            dimention.every(element => element <= this.validDimention && element > 0 &&
            dimention.length === 2)) {
            return dimention;
        }
        return [];
    }

    /**
     * Check if the string can be converted to a binary array with proper length.
     * return converted array if the string is a binary array
     * @param {string} value 
     * @returns {number[] | boolean}
     */
    isValidRow(value: string, cols: number): number[]  {
        const row = value.split(this.rowElementSeperator).map(Number);
        if (row.every(element => element === 0 || element === 1) && 
            row.length === cols) {
            return row;
        }
        return [];
    }
}


// const validator = new Validation();
// console.log(validator.isValidDimention("4 4 4"));