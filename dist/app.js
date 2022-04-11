"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./utilities/engine");
const userInput_1 = require("./utilities/userInput");
const chalk_1 = __importDefault(require("chalk"));
const classValidator_1 = require("./utilities/classValidator");
const config_1 = require("./utilities/config");
const fileService_1 = require("./utilities/fileService");
/**
 * The entry point of the program.
 */
async function main() {
    const config = await (0, userInput_1.testFileConfig)();
    const fileConfig = new config_1.FileConfig(config.filePath, config.maxNumberOfProblems, config.validDimention, config.dimentionSeperator, config.rowElementSeprator, config.resultSeperator);
    const engine = new engine_1.Engine(new classValidator_1.Validation(fileConfig), new fileService_1.FileService(fileConfig));
    try {
        const data = await engine.processLineByLine();
        console.log(data);
    }
    catch (error) {
        console.log(chalk_1.default.red(`Error while processing file: ${config.filePath}`));
        console.log(chalk_1.default.red(error));
    }
}
main();
