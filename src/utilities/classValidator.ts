
class Validator {

    /**
     * @param
     */
    public validNumberOfProblems: number;
    public validDimention: number;
    public dimentionSeperator: string;
    public rowElementSeperator: string;

    constructor(validNumberOfProblems: number = 1000, 
                validDimention: number = 182, 
                dimentionSeperator: string = " ", 
                rowElementSeperator: string = "") {
        this.validNumberOfProblems = validNumberOfProblems;
        this.validDimention = validDimention;
        this.dimentionSeperator = dimentionSeperator;
        this.rowElementSeperator = rowElementSeperator;
    }

    /**
     * Check if the string can be converted to number and
     * its value is less than or equal 182
     */
    isValidDimention(value: string): boolean {
        if ( Number(value) <= this.validDimention) {
            return true;
        }
        return false;
    }

    /**
     * Check if the string can be converted to a binary array.
     * return converted array if the string is a binary array
     * @param {string} value 
     * @returns {number[] | boolean}
     */
    isBinary(value: string): number[] | boolean {
        const row = value.split(this.rowElementSeperator).map(Number);
        if (row.every(element => element === 0 || element === 1)) {
            return row;
        }
        return false;
    }



}


const validator = new Validator();
console.log(validator.isBinary('10101'))
console.log(validator.isBinary('101B1'))

console.log(validator.isBinary('1031'))