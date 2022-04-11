"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFileConfig = void 0;
const inquirer_1 = require("inquirer");
/**
 * This function is responsible for recieving path to the problem file and its
 * configuration.
 * @return {Promise}
 */
async function testFileConfig() {
    const config = await (0, inquirer_1.prompt)([{
            name: 'filePath',
            message: 'Please enter the path to the file containing test cases:',
            type: 'input',
            default: 'mockFiles/mockFile.txt',
        }, {
            name: 'maxNumberOfProblems',
            message: 'Please enter max number of problems:',
            type: 'input',
            default: 1000,
        }, {
            name: 'validDimention',
            message: 'Please enter valid dimention:',
            type: 'input',
            default: 182,
        }, {
            name: 'dimentionSeperator',
            message: 'Please enter dimention seperator:',
            type: 'list',
            choices: ['space', '-', '_', '.', 'nothing'],
            default: ' space',
        }, {
            name: 'rowElementSeprator',
            message: 'Please enter matrix entry seperator:',
            type: 'list',
            choices: ['space', '-', '_', '.', 'nothing'],
            default: 'nothing',
        }, {
            name: 'resultSeperator',
            message: 'Please enter result matrix seperator',
            type: 'list',
            choices: ['space', '-', '_', '.', 'nothing'],
            default: 'space',
        }]);
    switch (config.dimentionSeperator) {
        case 'space':
            config.dimentionSeperator = ' ';
            break;
        case 'nothing':
            config.dimentionSeperator = '';
            break;
    }
    switch (config.rowElementSeprator) {
        case 'space':
            config.rowElementSeprator = ' ';
            break;
        case 'nothing':
            config.rowElementSeprator = '';
            break;
    }
    switch (config.resultSeperator) {
        case 'space':
            config.resultSeperator = ' ';
            break;
        case 'nothing':
            config.resultSeperator = '';
            break;
    }
    return config;
}
exports.testFileConfig = testFileConfig;
