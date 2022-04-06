import {Utils} from './utilities';

class SolverEngine {
    private readonly filePath: string;
    private util: Utils
    private numberOfProblems: number
    private dimentions: number[][] = [];

    constructor(filePath: string) {
        this.filePath = filePath;
        this.util = new Utils(this.filePath)
        this.numberOfProblems = 0;
    }

    async setNumberOfProblems() {
        this.util.readNumberOfProblems()
            .then((n) => {
                this.numberOfProblems = n;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async setDimentionsofProblems() {
        let cursor = 2;
        for (let i = 0; i < this.numberOfProblems; i++) {
            this.util.readNthLine(cursor)
                .then((line) => {
                    const [rows, cols] = line.split(' ').map(Number);
                    this.dimentions.push([rows, cols]);
                    cursor += rows + 1;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}