"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const engine_1 = require("./utilities/engine");
if (process_1.argv[2]) {
    for (let i = 2; i < process_1.argv.length; i++) {
        const engine = new engine_1.Engine(process_1.argv[i]);
        engine.processLineByLine().then((matrices) => {
            console.log(matrices);
        });
    }
}
