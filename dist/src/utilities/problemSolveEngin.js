"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolverEngine = void 0;
const utilities_1 = require("./utilities");
class SolverEngine {
    constructor(filePath) {
        this.allMatrices = [];
        this.filePath = filePath;
        this.util = new utilities_1.Utils(this.filePath);
        this.numberOfProblems = 0;
        this.dimentions = [];
    }
    ;
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setNumberOfProblems();
            yield this.setDimentionsofProblems();
        });
    }
    setNumberOfProblems() {
        return new Promise((resolve, reject) => {
            this.util.readNthLine(1)
                .then((line) => {
                this.numberOfProblems = Number(line);
                resolve(this.numberOfProblems);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    setDimentionsofProblems() {
        return new Promise((resolve, reject) => {
            let cursor = 2;
            for (let i = 0; i < this.numberOfProblems; i++) {
                this.util.readNthLine(cursor)
                    .then((line) => {
                    const [rows, cols] = line.split(' ').map(Number);
                    this.dimentions.push([rows, cols]);
                    cursor += rows + 1;
                })
                    .catch((error) => {
                    reject(error);
                });
            }
            resolve(this.dimentions);
        });
    }
    readMatrix() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.SolverEngine = SolverEngine;
