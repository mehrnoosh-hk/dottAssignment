var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import * as readline from 'readline';
import * as fs from 'fs';
export class Engine {
    constructor(filePath) {
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
        }
        else {
            try {
                const rl = readline.createInterface({
                    input: fs.createReadStream(this.filePath),
                });
                this.rl.push(rl);
                return rl;
            }
            catch (error) {
                throw error;
            }
        }
    }
    async processLineByLine() {
        var e_1, _a;
        let cursor = 0;
        this.createReadlineInterface();
        const rl = this.rl[0];
        try {
            for (var rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = await rl_1.next(), !rl_1_1.done;) {
                const line = rl_1_1.value;
                cursor++;
                if (cursor === 1) {
                    this.numberOfProblems = Number(line);
                }
                else if (cursor === 2) {
                    this.dimention = line.split(' ').map(Number);
                    this.endOfMatrix = cursor + this.dimention[0];
                }
                else if (cursor < this.endOfMatrix) {
                    this.matrix.push(line.split('').map(Number));
                }
                else if (cursor === this.endOfMatrix) {
                    this.matrix.push(line.split('').map(Number));
                    this.problemMatrices.push(this.matrix);
                    this.matrix = [];
                }
                else {
                    this.dimention = line.split(' ').map(Number);
                    this.endOfMatrix = cursor + this.dimention[0];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (rl_1_1 && !rl_1_1.done && (_a = rl_1.return)) await _a.call(rl_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this.problemMatrices;
    }
}
const engine = new Engine('/home/mehrnoush/Documents/Programming/dottAssignment/test/utilities/mockFile.txt');
console.log(await engine.processLineByLine());
