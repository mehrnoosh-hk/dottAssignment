import * as readline from 'readline';
import * as fs from 'fs';


// TODO: Move error definitions to a file

/**
 * Create a readline interface for the user to interact with.
 * @param {string} filePath The address to the file to read from.
 * @return {Promise<readline.ReadLine>} A readline interface.
 */
export function CreateReadlineInterface(filePath: string):
                                        Promise<readline.ReadLine> {
  return new Promise((resolve, reject) => {
    try {
      const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
      });
      resolve(rl);
    } catch (error) {
      reject(error);
    }
  });
}


/**
 * Reads the nth line of a file.
 * @param {readline.ReadLine} rl The readline interface to read from.
 * @param {number} n The line number to read.
 * @return {Promise<string>} A promise that resolves to the 
 * nth line of the file.
 */
export function ReadNthLine(rl: readline.Interface, n: number):
                            Promise<string> {
  return new Promise((resolve, reject) => {
    let lineNumber = 0;
    rl.on('line', (line) => {
      lineNumber++;
      if (lineNumber === n) {
        rl.close();
        // TODO: Improve to close only once
        resolve(line);
      }
    });

    rl.on('error', reject);
  });
}

/**
 * Reads the number of problems from test file.
 * @param {string} filePath The address to the file to read from.
 * @return {Promise<number>} A promise that resolves to the number of problems.
 */
export async function ReadNumberOfProblems(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      CreateReadlineInterface(filePath).then((rl) => {
        const lineNumber = 1;
        ReadNthLine(rl, lineNumber).then((line) => {
          resolve(parseInt(line));
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};
