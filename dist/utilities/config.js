"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileConfig = void 0;
/**
 * This class is ablue print of a file config object.
 */
class FileConfig {
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
    constructor(filePath = './mockFiles/mockFile.txt', maxNumberOfProblems = 1000, validDimention = 182, dimentionSeperator = ' ', rowElementSeperator = '', resultSeperator = ' ', testCaseSeperator = '\n') {
        this.filePath = filePath;
        this.maxNumberOfProblems = maxNumberOfProblems;
        this.validDimention = validDimention;
        this.dimentionSeperator = dimentionSeperator;
        this.rowElementSeperator = rowElementSeperator;
        this.resultSeperator = resultSeperator;
        this.testCaseSeperator = testCaseSeperator;
    }
}
exports.FileConfig = FileConfig;
