"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./utilities/engine");
const inquirer_1 = require("inquirer");
const chalk_1 = __importDefault(require("chalk"));
async function testFileConfig() {
    const config = await (0, inquirer_1.prompt)([{
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
            choices: ['space', '-', '_', '.', 'Nothing'],
            default: 'space',
        }, {
            name: 'rowElementSeprator',
            message: 'Please enter matrix entry seperator:',
            type: 'list',
            choices: ['space', '-', '_', '.', 'Nothing'],
            default: 'Nothing',
        }, {
            name: 'resultSeperator',
            message: 'Please enter result matrix seperator',
            type: 'list',
            choices: ['space', '-', '_', '.', 'Nothing'],
            default: 'space',
        }]);
    return config;
}
async function takeInput() {
    const answer = await (0, inquirer_1.prompt)([{
            name: 'path',
            message: 'Please enter files path to test cases seperated with space: \
    example: /path/to/file/one /path/to/file/two',
        }]);
    return answer;
}
/**
 * The entry point of the program.
 */
async function main() {
    const config = await testFileConfig();
    const answer = await takeInput();
    const addresses = answer['path'].split(' ');
    for (const address of addresses) {
        const engine = new engine_1.Engine(address);
        try {
            const data = await engine.processLineByLine();
            console.log(data);
        }
        catch (error) {
            console.log(chalk_1.default.red(`Error while processing file: ${address}`));
            console.log(chalk_1.default.red(error));
        }
    }
}
main();
