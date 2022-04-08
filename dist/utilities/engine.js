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
/**
 * A class that manage all steps of reading, validation and sending the
 * problems to be solved and gather the results.
 */
class Engine {
    /**
     *
     * @param {string} filePath The path of the file to be processed.
     * @param {number} numberOfProblems The number of problems to be solved.
     * @param {number[]} dimention The dimention of the matrix that engine works on.
     * @param endOfMatrix The line number containing the last row of matrix.
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
        this.validator = [];
    }
    /**
     * This method creates a readline interface of each instance of Engine class
     * @returns {readline.ReadLine} The readline interface.
     */
    createReadlineInterface() {
        if (this.rl.length > 0) {
            return this.rl[0];
        }
        else {
            try {
                const rl = readline.createInterface({
                    input: fs.createReadStream(this.filePath),
                });
                this.rl.push(rl);
                return rl;
            }
            catch (error) {
                throw error;
            }
        }
    }
    /**
     * This method creates a validator for test file validation.
     * @returns {Validation} The validator instance.
     */
    createValidator() {
        if (this.validator.length > 0) {
            return this.validator;
        }
        else {
            try {
                const validator = new classValidator_1.Validation();
                this.validator.push(validator);
                return this.validator;
            }
            catch (error) {
                throw error;
            }
        }
    }
    numberOfProblemsHandler(line) {
        const numberOfProblems = this.validator[0].isValidNumberOfProblems(line);
        if (numberOfProblems > 0) {
            this.numberOfProblems = numberOfProblems;
        }
        else {
            throw new Error(`Invalid number of problems ${this.validator[0].isValidNumberOfProblems(line)}`);
        }
    }
    dimentionHandler(cursor, line) {
        const dimention = this.validator[0].isValidDimention(line);
        if (dimention.length > 0) {
            this.dimention = dimention;
            this.endOfMatrix = cursor + this.dimention[0];
        }
        else {
            throw new Error('Invalid dimention');
        }
    }
    matrixHandler(cursor, line) {
        const row = this.validator[0].isValidRow(line, this.dimention[1]);
        if (row.length > 0) {
            this.matrix.push(row);
        }
        else {
            throw new Error('Invalid row at line: ' + cursor);
        }
    }
    endOfMatrixHandler(line) {
        const row = this.validator[0].isValidRow(line, this.dimention[1]);
        if (row.length > 0) {
            this.matrix.push(row);
            this.problemMatrices.push(this.matrix);
            const solver = new nearestNode_1.NearestWhitePixelProblem(this.matrix);
            this.solutionMatrices.push(solver.nearestWhitePixel());
            this.matrix = [];
        }
        else {
            throw new Error('Invalid row at line: ' + this.endOfMatrix);
        }
    }
    nextMatrixHandler(cursor, line) {
        const dimention = this.validator[0].isValidDimention(line);
        if (dimention.length > 0) {
            this.dimention = dimention;
            this.endOfMatrix = cursor + this.dimention[0];
        }
        else {
            throw new Error('Invalid dimention at line: ' + cursor);
        }
    }
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
     * This method reads a test file line by line an send test matrices
     * to be solved accordingly.
     * @returns {Promise<number[][][]>} The promise of the matrix containing all matrices of a
     * test file.
     */
    async processLineByLine() {
        var e_1, _a;
        let cursor = 0;
        this.createReadlineInterface();
        const rl = this.rl[0];
        this.createValidator();
        try {
            for (var rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = await rl_1.next(), !rl_1_1.done;) {
                const line = rl_1_1.value;
                cursor++;
                this.cursorHandler(cursor, line);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (rl_1_1 && !rl_1_1.done && (_a = rl_1.return)) await _a.call(rl_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this.problemMatrices;
    }
}
exports.Engine = Engine;
// const engine = new Engine('/home/mehrnoush/Documents/Programming/dottAssignment/mockFiles/mockFile.txt');
// engine.processLineByLine().then(console.log);
