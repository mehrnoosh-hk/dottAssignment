import { argv } from "process";
import { Engine } from "./utilities/engine";

if (argv[2]) {
    for (let i =2; i < argv.length; i++) {
        const engine = new Engine(argv[i]);
        engine.processLineByLine().then((matrices) => {
            console.log(matrices);
        });
    }
}