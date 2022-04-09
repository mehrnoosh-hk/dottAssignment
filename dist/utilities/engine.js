"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
const readline = __importStar(require("readline"));
const fs = __importStar(require("fs"));
const nearestNode_1 = require("./nearestNode");
const classValidator_1 = require("./classValidator");
const path = __importStar(require("path"));
/**
 * A class that manage all steps of reading, validation and sending the
 * problems to be solved and gather the results.
 */
class Engine {
    /**
       *
       * @param {string} filePath The path of the file to be processed.
       * @param {number} numberOfProblems The number of problems to be solved.
       * @param {number[]} dimention The dimention of the matrix that engine
       * works on.
       * @param {number} endOfMatrix The line number containing the last row
       * of matrix.
       */
    constructor(filePath) {
        this.filePath = filePath;
        this.rl = [];
        this.numberOfProblems = 0;
        this.dimention = [];
        this.endOfMatrix = 0;
        this.matrix = [];
        this.problemMatrices = [];
        this.solutionMatrices = [];
        this.validator = new classValidator_1.Validation(this.filePath);
    }
    /**
       * This method creates a readline interface of each instance of
       * Engine class
       * @return {readline.ReadLine} The readline interface.
       */
    createReadlineInterface() {
        if (this.rl.length > 0) {
            return this.rl[0];
        }
        else {
            try {
                const input = fs.createReadStream(this.filePath);
                const rl = readline.createInterface({
                    input: input,
                });
                this.rl.push(rl);
                return rl;
            }
            catch (error) {
                console.log('Bad file path');
                throw new Error(`Error while creating readline interface: ${error}`);
            }
        }
    }
    /**
     * This method is responsible for handling the validation of first line
     * of submitted test file and throw appropriate error if it is invalid.
     * @param {string} line The line to be processed.
     */
    numberOfProblemsHandler(line) {
        const numberOfProblems = this.validator.isValidNumberOfProblems(line);
        if (numberOfProblems > 0) {
            this.numberOfProblems = numberOfProblems;
        }
        else {
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
    dimentionHandler(cursor, line) {
        const dimention = this.validator.isValidDimention(line);
        if (dimention.length > 0) {
            this.dimention = dimention;
            this.endOfMatrix = cursor + this.dimention[0];
        }
        else {
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
    matrixHandler(cursor, line) {
        const row = this.validator.isValidRow(line, this.dimention[1]);
        if (row.length > 0) {
            this.matrix.push(row);
        }
        else {
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
    endOfMatrixHandler(line) {
        const row = this.validator.isValidRow(line, this.dimention[1]);
        if (row.length > 0) {
            this.matrix.push(row);
            this.problemMatrices.push(this.matrix);
            const solver = new nearestNode_1.NearestWhitePixelProblem(this.matrix);
            const solution = solver.nearestWhitePixel();
            this.solutionMatrices.push(solution);
            this.matrix = [];
        }
        else {
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
    nextMatrixHandler(cursor, line) {
        const dimention = this.validator.isValidDimention(line);
        if (dimention.length > 0) {
            this.dimention = dimention;
            this.endOfMatrix = cursor + this.dimention[0];
        }
        else {
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
    cursorHandler(cursor, line) {
        if (cursor === 1) {
            this.numberOfProblemsHandler(line);
        }
        else if (cursor === 2) {
            this.dimentionHandler(cursor, line);
        }
        else if (cursor < this.endOfMatrix) {
            this.matrixHandler(cursor, line);
        }
        else if (cursor === this.endOfMatrix) {
            this.endOfMatrixHandler(line);
        }
        else {
            this.nextMatrixHandler(cursor, line);
        }
    }
    /**
     * This method is responsible for writing the solution to the file.
     */
    async writeResults() {
        const resultPath = path.basename(this.filePath, '.txt') + '_result.txt';
        const ws = fs.createWriteStream(resultPath);
        for (const matrix of this.solutionMatrices) {
            const data = matrix.map((row) => row.join(' ')).join('\n');
            ws.write(data + '\n');
        }
    }
    /**
       * This method reads a test file line by line an send test matrices
       * to be solved accordingly.
       * @returns {Promise<number[][][]>} The promise of the matrix containing
       * all matrices of a test file.
       */
    async processLineByLine() {
        var e_1, _a;
        if (!this.validator.isValidAddress) {
            throw new Error(`Invalid file path: ${this.filePath}`);
        }
        try {
            this.createReadlineInterface();
        }
        catch (error) {
            throw new Error(`Error while creating readline interface: ${error}`);
        }
        let cursor = 0;
        const rl = this.rl[0];
        try {
            for (var rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = await rl_1.next(), !rl_1_1.done;) {
                const line = rl_1_1.value;
                cursor++;
                try {
                    this.cursorHandler(cursor, line);
                }
                catch (error) {
                    throw new Error(`Error while processing line ${cursor} ${error}`);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (rl_1_1 && !rl_1_1.done && (_a = rl_1.return)) await _a.call(rl_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        await this.writeResults();
        return this.problemMatrices;
    }
}
exports.Engine = Engine;
