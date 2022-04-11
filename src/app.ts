import {Engine} from './utilities/engine';
import { testFileConfig } from './utilities/userInput';
import chalk from 'chalk';
import {Validation} from './utilities/classValidator';
import {FileConfig} from './utilities/config';
import {FileService} from './utilities/fileService';


/**
 * The entry point of the program.
 */
async function main() {

  const config = await testFileConfig();
  const fileConfig = new FileConfig(
    config.filePath,
    config.maxNumberOfProblems,
    config.validDimention,
    config.dimentionSeperator,
    config.rowElementSeprator,
    config.resultSeperator,
  );

  const engine = new Engine(new Validation(fileConfig), new FileService(fileConfig));
  try {
    const data = await engine.processLineByLine();
    console.log(data);
  } catch (error) {
    console.log(chalk.red(`Error while processing file: ${config.filePath}`));
    console.log(chalk.red(error));
  }
}

main();
