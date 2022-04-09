"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./utilities/engine");
const inquirer_1 = require("inquirer");
const chalk_1 = __importDefault(require("chalk"));
/**
 * This method asks user to submit file path to test cases.
 * @return {string} user answer
 */
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
