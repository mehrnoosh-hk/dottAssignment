import * as readline from 'readline';
import * as fs from 'fs';
import { NearestWhitePixelProblem } from './nearestNode';
import { Validation } from './classValidator';


/**
 * A class that manage all steps of reading, validation and sending the 
 * problems to be solved and gather the results.
 */
export class Engine {

    /**
     * @property {string} filePath The path of the file to be processed.
     */
    public readonly filePath: string;
    /**
     * @property {readline.ReadLine} rl The readline interface.
     */
    public rl: readline.ReadLine[];
    /**
     * @property {number} numberOfProblems The number of problems to be solved.
     */
    public numberOfProblems: number;
    /**
     * @property {number[]} dimention The dimention of the matrix that engine works on.
     */
    public dimention: number[];
    /**
     * @property {number} endOfMatrix The line number containing the last row of matrix.
     */
    public endOfMatrix: number;
    /**
     * @property {number[][]} matrix The matrix that engine works on.
     */
    public matrix: number[][];
    /**
     * @property {number[][][]} problemMatrices The matrix containing all matrices of a
     * test file.
     */
    public problemMatrices: number[][][];
    /**
     * @property {number[][][]} solutionMatrices The matrix contains all solution matrices 
     * of a test file.
     */
    public solutionMatrices: number[][][]


    public validator: Validation[];

    /**
     * 
     * @param {string} filePath The path of the file to be processed.
     * @param {number} numberOfProblems The number of problems to be solved.
     * @param {number[]} dimention The dimention of the matrix that engine works on.
     * @param endOfMatrix The line number containing the last row of matrix.
     */
    constructor(filePath: string) {
        this.filePath = filePath;
        this.rl = [];
        this.numberOfProblems = 0;
        this.dimention = [];
        this.endOfMatrix = 0;
        this.matrix = [];
        this.problemMatrices = [];
        this.solutionMatrices = [];
        this.validator = [];
    }

    /**
     * This method creates a readline interface of each instance of Engine class
     * @returns {readline.ReadLine} The readline interface.
     */
    createReadlineInterface(): readline.ReadLine {
        if (this.rl.length > 0) {
            return this.rl[0];
        } else {
            try {
                const rl = readline.createInterface({
                    input: fs.createReadStream(this.filePath),
                });
                this.rl.push(rl);
                return rl;
            } catch (error) {
                throw error;
            }
        }
    }


    /**
     * This method creates a validator for test file validation.
     * @returns {Validation} The validator instance.
     */
    createValidator(): Validation[] {
        if (this.validator.length > 0) {
            return this.validator;
        } else {
            try {
                const validator = new Validation();
                this.validator.push(validator);
                return this.validator;
            } catch (error) {
                throw error;
            }
        }
    }

    numberOfProblemsHandler(line: string): void {

        const numberOfProblems = this.validator[0].isValidNumberOfProblems(line);
        if (numberOfProblems > 0) {
            this.numberOfProblems = numberOfProblems;
        } else {
            throw new Error(`Invalid number of problems ${this.validator[0].isValidNumberOfProblems(line)}`);
        }
    }

    dimentionHandler(cursor:number, line: string): void {

        const dimention = this.validator[0].isValidDimention(line);
        if (dimention.length > 0) {
            this.dimention = dimention;
            this.endOfMatrix = cursor + this.dimention[0];
        } else {
            throw new Error('Invalid dimention');
        }
    }

    matrixHandler(cursor: number, line: string): void {
        const row = this.validator[0].isValidRow(line, this.dimention[1]);
        if (row.length > 0) {
            this.matrix.push(row);
        } else {
            throw new Error('Invalid row at line: ' + cursor);
        }
    }

    endOfMatrixHandler(line: string): void {

        const row = this.validator[0].isValidRow(line, this.dimention[1]);
        if (row.length > 0) {
            this.matrix.push(row);
            this.problemMatrices.push(this.matrix);
            const solver = new NearestWhitePixelProblem(this.matrix);
            this.solutionMatrices.push(solver.nearestWhitePixel());
            this.matrix = [];
        } else {
            throw new Error('Invalid row at line: ' + this.endOfMatrix);
        }
    }

    nextMatrixHandler(cursor:number, line: string): void {

        const dimention = this.validator[0].isValidDimention(line);
        if (dimention.length > 0) {
            this.dimention = dimention;
            this.endOfMatrix = cursor + this.dimention[0];
        } else {
            throw new Error('Invalid dimention at line: ' + cursor);
        }
    }


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
     * This method reads a test file line by line an send test matrices 
     * to be solved accordingly.
     * @returns {Promise<number[][][]>} The promise of the matrix containing all matrices of a
     * test file.
     */
    async processLineByLine(): Promise<number[][][]> {

        let cursor = 0;
        this.createReadlineInterface();
        const rl = this.rl[0];
        this.createValidator();
        for await (const line of rl) {
            cursor ++;
            this.cursorHandler(cursor, line);
        }

        return this.problemMatrices;
    }
}


// const engine = new Engine('/home/mehrnoush/Documents/Programming/dottAssignment/mockFiles/mockFile.txt');
// engine.processLineByLine().then(console.log);