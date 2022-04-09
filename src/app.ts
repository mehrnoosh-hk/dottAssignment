import { Engine } from "./utilities/engine";
import { prompt } from 'inquirer';
import chalk from 'chalk';

async function takeInput() {
    
    const answer = await prompt([{
        name: 'path',
        message: 'Please enter files path seperated with space:',
    }]);
    return answer;
}

async function main() {

    const answer = await takeInput();
    let addresses = answer['path'].split(' ');

    for (const address of addresses) {
        const engine = new Engine(address);
        try{
            const data = await engine.processLineByLine()
            console.log(data);
            
              
        } catch (error) {
            console.log(chalk.red(`Error while processing file: ${address}`));
            console.log(chalk.red(error));
        }
    } 
}

main();