import {Engine} from './utilities/engine';
import {prompt} from 'inquirer';
import chalk from 'chalk';

/**
 * This method asks user to submit file path to test cases.
 * @return {string} user answer
 */
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
