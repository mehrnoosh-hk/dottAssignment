"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
const path = __importStar(require("path"));
/**
 * File service class contains all methods to read and write to a file.
 */
class FileService {
    /**
     * Constructor of the FileService class.
     * @param {FileConfig} fileConfig The configuration of the submitted
     * problem file.
     */
    constructor(fileConfig) {
        this.filePath = fileConfig.filePath;
        this.readline = readline.createInterface({
            input: fs.createReadStream(this.filePath),
        });
        this.writeStream = fs.createWriteStream(path.basename(this.filePath, '.txt') + '_result.txt');
    }
    /**
     * Method to write to the file.
     * @param {string} data The data to be written to the file.
     */
    write(data) {
        this.writeStream.write(data + '\n');
    }
}
exports.FileService = FileService;
