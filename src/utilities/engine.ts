import * as readline from 'readline';
import * as fs from 'fs';

export class Engine {
    public readonly filePath: string;
    private rl: readline.ReadLine[];
    public numberOfProblems: number;
    public dimention: number[];
    public endOfMatrix: number;
    public matrix: number[][];
    public problemMatrices: number[][][];


    constructor(filePath: string) {
        this.filePath = filePath;
        this.rl = [];
        this.numberOfProblems = 0;
        this.dimention = [];
        this.endOfMatrix = 0;
        this.matrix = [];
        this.problemMatrices = [];
    }

    createReadlineInterface() {
        if (this.rl.length > 0) {
            return this.rl[0];
        } else {
            try {
                const rl = readline.createInterface({
                    input: fs.createReadStream(this.filePath),
                });
                this.rl.push(rl);
                return rl;
            } catch (error) {
                throw error;
            }
        }
    }


    solve() {
        // create a readline interface
        try {
            this.createReadlineInterface();
        } catch (error) {
            throw error;
        };

        let cursor = 0;

        try {
            this.rl[0].on('line', (line) => {
                cursor ++;
                console.log(this.rl[0].cursor)
                if (cursor === 1) {
                    this.numberOfProblems = Number(line);
                    console.log(`Number of problems: ${this.numberOfProblems}`);
                } else if (cursor === 2) {
                    this.dimention = line.split(' ').map(Number);
                    this.endOfMatrix = cursor + this.dimention[0];
                    console.log(`Dimention: ${this.dimention[0]} ${this.dimention[1]}`);
                    console.log(`End of matrix: ${this.endOfMatrix}`);
                } else if (cursor < this.endOfMatrix) {
                    this.matrix.push(line.split('').map(Number));
                } else if (cursor === this.endOfMatrix) {
                    this.matrix.push(line.split('').map(Number));
                    this.problemMatrices.push(this.matrix);
                    console.log(this.matrix);
                    this.matrix = [];
                } else {
                    this.dimention = line.split(' ').map(Number);
                    this.endOfMatrix = cursor + this.dimention[0];
                }  
            })
        } catch (error) {
            throw error;
        }

        // read the matrix

        // pass matrix to the solver

        // return the result

        // Repeat the above steps for all the problems
    }
}


const engine = new Engine('test/utilities/mockFile.txt');
engine.solve()