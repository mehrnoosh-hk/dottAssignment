import {Engine} from './utilities/engine';
import {prompt} from 'inquirer';
import chalk from 'chalk';

/**
 * This method asks user to submit file path to test cases.
 * @return {string} user answer
 */

type userSettings = {
  maxNumberOfProblems: number,
  validDimention: number,
  dimentionSeperator: string,
  rowElementSeperator: string,
  resultSeperator: string,
}

async function testFileConfig(): Promise<{}> {
  const config = await prompt([{
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
  }])
  return config;
}


async function takeInput(): Promise<{path: string}> {
  const answer = await prompt([{
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
    const engine = new Engine(address);
    try {
      const data = await engine.processLineByLine();
      console.log(data);
    } catch (error) {
      console.log(chalk.red(`Error while processing file: ${address}`));
      console.log(chalk.red(error));
    }
  }
}

main();
