"use strict";
// import * as readline from 'readline';
// import * as fs from 'fs';
// /**
//  * A class that provides nessessary utility functions to work with test files.
//  */
// export class Utils {
//   public filePath: string;
//   public rl: readline.ReadLine[];
//   /**
//    * Initialize an instance of class.
//    * @param {string} filePath The path to the bitmap file.
//    */
//   constructor(filePath: string) {
//     this.filePath = filePath;
//     this.rl = [];
//     this.createReadlineInterface();
//   }
//   /**
//    * Create a readline interface for the user to interact with.
//    * If an interface already exists, return it.
//    * @return {Promise<readline.ReadLine>} A readline interface.
//    */
//   createReadlineInterface():Promise<readline.ReadLine> {
//     if (this.rl.length > 0) {
//       return Promise.resolve(this.rl[0]);
//     } else {
//       return new Promise((resolve, reject) => {
//         try {
//           const rl = readline.createInterface({
//             input: fs.createReadStream(this.filePath),
//           });
//           this.rl.push(rl);
//           resolve(rl);
//         } catch (error) {
//           reject(error);
//         }
//       });
//     }
//   }
//   /**
//    * Close any open readline interface
//    */
//   closeReadlineInterface() {
//     this.rl[0].close();
//   }
//   /**
//    * Reads the nth line of a file.
//    * @param {number} n The line number to read.
//    * @return {Promise<string>} A promise that resolves to the
//    * nth line of the file.
//    */
//   readNthLine(n: number):Promise<string> {
//     return new Promise((resolve, reject) => {
//       let lineNumber = 0;
//       this.rl[0].on('line', (line) => {
//         lineNumber++;
//         if (lineNumber === n) {
//           resolve(line);
//         }
//       });
//       this.rl[0].on('error', reject);
//     });
//   }
//   /**
//    * Reads the a chunk of file between nth and mth lines.
//    * @param {number} n The line number to start reading from.
//    * @param {number} m The line number to stop reading at.
//    * @return {Promise<string>} A promise that resolves to the
//    * nth line of the file.
//    */
//    readChunk(n: number, m: number):Promise<string[]> {
//     return new Promise((resolve, reject) => {
//       let lineNumber = 0;
//       let stringMatrix: string[] = [];
//       try {
//         this.rl[0].on('line', (line) => {
//           lineNumber++;
//           if (lineNumber >= n && lineNumber <= m) {
//             stringMatrix.push(line);
//           }
//           resolve(stringMatrix);
//         });
//       } catch (error) {
//         reject(error);
//       } 
//       this.rl[0].on('error', reject);
//     });
//   }
//   /**
//    * Reads the number of bitmap problems from test file.
//    * @return {Promise<number>} A promise that resolves to the number of
//    * bitmap problems in the file.
//    */
//   readNumberOfProblems(): Promise<number> {
//     return new Promise((resolve, reject) => {
//       try {
//         this.readNthLine(1).then((line) => {
//           resolve(parseInt(line));
//         });
//       } catch (error) {
//         reject(error);
//       }
//     });
//   };
// }
// // TODO: Move error definitions to a file
