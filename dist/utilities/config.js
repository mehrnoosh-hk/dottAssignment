"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileConfig = void 0;
class FileConfig {
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
