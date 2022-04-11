import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';
import {FileConfig} from './config';


/**
 * Interface for file service
 */
export interface IFileService {
    readline: readline.ReadLine;
    writeStream: fs.WriteStream;
    write(data: string): void
}

/**
 * File service class contains all methods to read and write to a file.
 */
export class FileService implements IFileService {
  /**
   * An instance of readline interface.
   */
  public readline: readline.Interface;

  /**
   * An instance of writeStream interface.
   */
  public writeStream: fs.WriteStream;

  /**
   * @property {string} filePath The path of the file to be read.
   */
  private filePath: string;

  /**
   * Constructor of the FileService class.
   * @param {FileConfig} fileConfig The configuration of the submitted
   * problem file.
   */
  constructor(fileConfig: FileConfig) {
    this.filePath = fileConfig.filePath;
    this.readline = readline.createInterface({
      input: fs.createReadStream(this.filePath),
    });
    this.writeStream = fs.createWriteStream(
        path.basename(this.filePath, '.txt') + '_result.txt',
    );
  }

  /**
   * Method to write to the file.
   * @param {string} data The data to be written to the file.
   */
  write(data: string): void {
    this.writeStream.write(data + '\n');
  }
}
