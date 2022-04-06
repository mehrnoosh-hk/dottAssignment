import * as readline from 'readline';
import * as fs from 'fs';

/**
 * A class that provides nessessary utility functions to work with test files.
 */
export class Utils {

  public filePath: string;
  public rl: readline.ReadLine[];

  constructor(filePath: string){
    this.filePath = filePath;
    this.rl = [];
    this.createReadlineInterface();
  }

  /**
   * Create a readline interface for the user to interact with.
   * If an interface already exists, return it.
   * @return {Promise<readline.ReadLine>} A readline interface.
   */
  createReadlineInterface():Promise<readline.ReadLine> {
    if (this.rl.length > 0) {
      return Promise.resolve(this.rl[0]);
    } else {

      return new Promise((resolve, reject) => {
        try {
          const rl = readline.createInterface({
          input: fs.createReadStream(this.filePath),
          });
          this.rl.push(rl)
          resolve(rl);
        } catch (error) {
          reject(error);
        }
      });
    }  
  }

  /**
   * Close any open readline interface
   */
  closeReadlineInterface() {
    this.rl[0].close();
  }

  /**
   * Reads the nth line of a file.
   * @param {number} n The line number to read.
   * @return {Promise<string>} A promise that resolves to the 
   * nth line of the file.
   */
  readNthLine(n: number):Promise<string> {
    return new Promise((resolve, reject) => {
      let lineNumber = 0;
      this.rl[0].on('line', (line) => {
        lineNumber++;
        if (lineNumber === n) {
          resolve(line);
        }
      });

      this.rl[0].on('error', reject);
    });
  }


  /**
   * Reads the number of problems from test file.
   * @return {Promise<number>} A promise that resolves to the number of problems.
   */
  ReadNumberOfProblems(): Promise<number> {
    return new Promise((resolve, reject) => {
      try {
          this.readNthLine(1).then((line) => {
            resolve(parseInt(line));
          });
        } catch (error) {
        reject(error);
      }
    });
  };

}

// TODO: Move error definitions to a file
