"use strict";
// import {Utils} from './utilities';
// export class SolverEngine {
//     private readonly filePath: string;
//     public util: Utils;
//     public numberOfProblems: number;
//     public dimentions: number[][];
//     public allMatrices: number[][][] = [];
//     constructor(filePath: string) {
//         this.filePath = filePath;
//         this.util = new Utils(this.filePath)
//         this.numberOfProblems = 0;
//         this.dimentions = [];
//     };
//     async initialize() {
//         await this.setNumberOfProblems();
//         await this.setDimentionsofProblems();
//     }
//     setNumberOfProblems() {
//         return new Promise((resolve, reject) => {
//             this.util.readNthLine(1)
//                 .then((line) => {
//                     this.numberOfProblems = Number(line);
//                     resolve(this.numberOfProblems);
//                 })
//                 .catch((error) => {
//                     reject(error);
//                 });
//         });
//     }
//     setDimentionsofProblems() {
//         return new Promise((resolve, reject) => { 
//             let cursor = 2;
//             for (let i = 0; i < this.numberOfProblems; i++) {
//                 this.util.readNthLine(cursor)
//                     .then((line) => {
//                         const [rows, cols] = line.split(' ').map(Number);
//                         this.dimentions.push([rows, cols]);
//                         cursor += rows + 1;
//                     })
//                     .catch((error) => {
//                         reject(error);
//                     });
//             }
//             resolve(this.dimentions);
//         });
//     }
//     async readMatrix() {
//         let cursor = 2;
//         for (let i = 0; i < this.numberOfProblems; i++) {
//             this.util.readChunk(cursor, cursor + this.dimentions[i][0])
//                 .then((matrix) => {
//                     this.allMatrices.push(matrix.map((row) => {
//                         return row.split('').map(Number);
//                     }));
//                     cursor += this.dimentions[i][0] + 1;
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         }
//     }
// }
