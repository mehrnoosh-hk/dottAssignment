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
exports.Utils = void 0;
const readline = __importStar(require("readline"));
const fs = __importStar(require("fs"));
/**
 * A class that provides nessessary utility functions to work with test files.
 */
class Utils {
    /**
     * Initialize an instance of class.
     * @param {string} filePath The path to the bitmap file.
     */
    constructor(filePath) {
        this.filePath = filePath;
        this.rl = [];
        this.createReadlineInterface();
    }
    /**
     * Create a readline interface for the user to interact with.
     * If an interface already exists, return it.
     * @return {Promise<readline.ReadLine>} A readline interface.
     */
    createReadlineInterface() {
        if (this.rl.length > 0) {
            return Promise.resolve(this.rl[0]);
        }
        else {
            return new Promise((resolve, reject) => {
                try {
                    const rl = readline.createInterface({
                        input: fs.createReadStream(this.filePath),
                    });
                    this.rl.push(rl);
                    resolve(rl);
                }
                catch (error) {
                    reject(error);
                }
            });
        }
    }
    /**
     * Close any open readline interface
     */
    closeReadlineInterface() {
        this.rl[0].close();
    }
    /**
     * Reads the nth line of a file.
     * @param {number} n The line number to read.
     * @return {Promise<string>} A promise that resolves to the
     * nth line of the file.
     */
    readNthLine(n) {
        return new Promise((resolve, reject) => {
            let lineNumber = 0;
            this.rl[0].on('line', (line) => {
                lineNumber++;
                if (lineNumber === n) {
                    resolve(line);
                }
            });
            this.rl[0].on('error', reject);
        });
    }
    /**
     * Reads the a chunk of file between nth and mth lines.
     * @param {number} n The line number to start reading from.
     * @param {number} m The line number to stop reading at.
     * @return {Promise<string>} A promise that resolves to the
     * nth line of the file.
     */
    readChunk(n, m) {
        return new Promise((resolve, reject) => {
            let lineNumber = 0;
            let stringMatrix = [];
            try {
                this.rl[0].on('line', (line) => {
                    lineNumber++;
                    if (lineNumber >= n && lineNumber <= m) {
                        stringMatrix.push(line);
                    }
                    resolve(stringMatrix);
                });
            }
            catch (error) {
                reject(error);
            }
            this.rl[0].on('error', reject);
        });
    }
    /**
     * Reads the number of bitmap problems from test file.
     * @return {Promise<number>} A promise that resolves to the number of
     * bitmap problems in the file.
     */
    readNumberOfProblems() {
        return new Promise((resolve, reject) => {
            try {
                this.readNthLine(1).then((line) => {
                    resolve(parseInt(line));
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    ;
}
exports.Utils = Utils;
// TODO: Move error definitions to a file
