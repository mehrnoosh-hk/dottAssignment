import * as readline from 'readline';
import * as fs from 'fs';

// TODO: Move error definitions to a file

// Create a readline interface
export function CreateReadlineInterface(filePath: string): Promise<readline.ReadLine> {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(filePath)
        });
        resolve(rl);
        reject(new Error("File not found"));
    });
}


// Read the nth line of a file
export function ReadNthLine(rl: readline.Interface, n: number): Promise<string> {
    
    return new Promise((resolve, reject) => {

        let lineNumber = 0;
        rl.on('line', (line) => {
            lineNumber++;
            if (lineNumber === n) {
                rl.close();
                // TODO: Improve to close only once
                resolve(line);
            }
        })

    rl.on('error', reject);
    })
}