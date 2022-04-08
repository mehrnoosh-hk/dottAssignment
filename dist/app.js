"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./utilities/engine");
const inquirer_1 = require("inquirer");
async function main() {
    const answer = await (0, inquirer_1.prompt)([{
            name: 'path',
            message: 'What would you like to say?',
        }]);
    let addresses = answer['path'].split(' ');
    for (const address of addresses) {
        console.log(address);
        const engine = new engine_1.Engine(address);
        engine.processLineByLine().then(console.log);
    }
}
main();
