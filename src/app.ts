import { Engine } from "./utilities/engine";
import { prompt } from 'inquirer';



async function main() {
    const answer = await prompt([{
        name: 'path',
        message: 'What would you like to say?',
    }]);

    
    let addresses = answer['path'].split(' ');

    for (const address of addresses) {
        console.log(address)
        const engine = new Engine(address);
        engine.processLineByLine().then(console.log)
    } 
}

main();