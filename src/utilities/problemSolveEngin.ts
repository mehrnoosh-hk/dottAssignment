import {Utils} from './utilities';

export class SolverEngine {
    private readonly filePath: string;
    private util: Utils
    public numberOfProblems: number
    public dimentions: number[][] = [];
    public allMatrices: number[][][] = [];

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

    async readMatrix() {
        let cursor = 2;
        for (let i = 0; i < this.numberOfProblems; i++) {
            this.util.readChunk(cursor, cursor + this.dimentions[i][0])
                .then((matrix) => {
                    this.allMatrices.push(matrix.map((row) => {
                        return row.split('').map(Number);
                    }));
                    cursor += this.dimentions[i][0] + 1;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}