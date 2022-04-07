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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
const readline = __importStar(require("readline"));
const fs = __importStar(require("fs"));
class Engine {
    constructor(filePath) {
        this.filePath = filePath;
        this.rl = [];
        this.numberOfProblems = 0;
        this.dimention = [];
        this.endOfMatrix = 0;
        this.matrix = [];
        this.problemMatrices = [];
    }
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
    solve() {
        // create a readline interface
        try {
            this.createReadlineInterface();
        }
        catch (error) {
            throw error;
        }
        ;
        let cursor = 0;
        try {
            this.rl[0].on('line', (line) => {
                cursor++;
                console.log(this.rl[0].cursor);
                if (cursor === 1) {
                    this.numberOfProblems = Number(line);
                    console.log(`Number of problems: ${this.numberOfProblems}`);
                }
                else if (cursor === 2) {
                    this.dimention = line.split(' ').map(Number);
                    this.endOfMatrix = cursor + this.dimention[0];
                    console.log(`Dimention: ${this.dimention[0]} ${this.dimention[1]}`);
                    console.log(`End of matrix: ${this.endOfMatrix}`);
                }
                else if (cursor < this.endOfMatrix) {
                    this.matrix.push(line.split('').map(Number));
                }
                else if (cursor === this.endOfMatrix) {
                    this.matrix.push(line.split('').map(Number));
                    this.problemMatrices.push(this.matrix);
                    console.log(this.matrix);
                    this.matrix = [];
                }
                else {
                    this.dimention = line.split(' ').map(Number);
                    this.endOfMatrix = cursor + this.dimention[0];
                }
            });
        }
        catch (error) {
            throw error;
        }
        // read the matrix
        // pass matrix to the solver
        // return the result
        // Repeat the above steps for all the problems
    }
}
exports.Engine = Engine;
const engine = new Engine('test/utilities/mockFile.txt');
engine.solve();
