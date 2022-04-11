import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';
import { FileConfig } from './config';

export interface IFileService {
    readline: readline.ReadLine;
    writeStream: fs.WriteStream;
    write(data: string): void
}

export class FileService implements IFileService {
    public readline: readline.Interface;
    public writeStream: fs.WriteStream;
    private filePath: string;

    constructor (fileConfig: FileConfig) {
        this.filePath = fileConfig.filePath;
        this.readline = readline.createInterface({
            input: fs.createReadStream(this.filePath),
        });
        this.writeStream = fs.createWriteStream(
            path.basename(this.filePath, '.txt') + '_result.txt'
        );
    }


    write(data: string): void {
       this.writeStream.write(data + '\n');
    }
}
