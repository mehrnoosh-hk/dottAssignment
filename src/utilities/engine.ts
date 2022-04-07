import * as readline from 'readline';
import * as fs from 'fs';
import { NearestWhitePixelProblem } from './nearestNode';

export class Engine {
    public readonly filePath: string;
    public rl: readline.ReadLine[];
    public numberOfProblems: number;
    public dimention: number[];
    public endOfMatrix: number;
    public matrix: number[][];
    public problemMatrices: number[][][];
    public solutionMatrices: number[][][]


    constructor(filePath: string) {
        this.filePath = filePath;
        this.rl = [];
        this.numberOfProblems = 0;
        this.dimention = [];
        this.endOfMatrix = 0;
        this.matrix = [];
        this.problemMatrices = [];
        this.solutionMatrices = [];
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

    async processLineByLine(): Promise<number[][][]> {

        let cursor = 0;
        this.createReadlineInterface();
        const rl = this.rl[0];
        for await (const line of rl) {
            cursor ++;
            if (cursor === 1) {
                this.numberOfProblems = Number(line);
            } else if (cursor === 2) {
                this.dimention = line.split(' ').map(Number);
                this.endOfMatrix = cursor + this.dimention[0];
            } else if (cursor < this.endOfMatrix) {
                this.matrix.push(line.split('').map(Number));
            } else if (cursor === this.endOfMatrix) {
                this.matrix.push(line.split('').map(Number));
                this.problemMatrices.push(this.matrix);
                const solver = new NearestWhitePixelProblem(this.matrix);
                this.solutionMatrices.push(solver.nearestWhitePixel());
                this.matrix = [];
            } else {
                this.dimention = line.split(' ').map(Number);
                this.endOfMatrix = cursor + this.dimention[0];
            }
        }
        return this.solutionMatrices;
    }
}


// const engine = new Engine('/home/mehrnoush/Documents/Programming/dottAssignment/test/utilities/mockFile.txt');
// console.log(await engine.processLineByLine());