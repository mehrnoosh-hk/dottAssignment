[![CI](https://github.com/MehrnooshIO/dottAssignment/actions/workflows/actions.yml/badge.svg?branch=dev)](https://github.com/MehrnooshIO/dottAssignment/actions/workflows/actions.yml)
# Find The Nearest White Pixel In A Bitmap

## Problem Description

There is given a rectangular bitmap of size n*m. Each pixel of the bitmap is either white or black, but at least one is white. The pixel in i-th line and j-th column is called the pixel (i,j). The distance between two pixels p1=(i1,j1) and p2=(i2,j2) is defined as d(p1,p2)=|i1-i2|+|j1-j2|.
This app reads the description of the bitmap from the standard input;
for each pixel, computes the distance to the nearest white and writes the results to the standard output.

Table of contents:

 1. [How to set up and run this app](https://github.com/MehrnooshIO/dottAssignment/#how-to-set-up-and-run-this-app)
 2. [Reference](https://github.com/MehrnooshIO/dottAssignment#refrence)
 3. [Errors and Error Handling](https://github.com/MehrnooshIO/dottAssignment#errors-and-error-handling) 
 4. [Tests](https://github.com/MehrnooshIO/dottAssignment#tests)
 5. [Asyncronous Processing](https://github.com/MehrnooshIO/dottAssignment#asynchronous-processing)
 6. [Improvements](https://github.com/MehrnooshIO/dottAssignment#improvements) 

## How to Set up and Run this APP

1.  Clone this repository to your local machine
2.  In order to install dependencies open the directory of the cloned repository in the terminal and run:

```bash
$ npm install
```
to install required dependencies

3.  Run the app with following command 
```bash
$ node dist/app.js
```
The app asks you to submit file path to the file containing problem cases. you can use any of mockfiles which is provided in repository in "mockFiles" directory.
The app prints the result to terminal and also creates a file named "testfilename_result.txt" in the main directory of the app.

## Refrence

### Engine
Engine is the core of the app. It is responsible for reading the input file, processing the input, sending it to be solved and writing the output.
Engine main method is `processLineByLine` which recives the filepath, and creates a read stream by calling `createReadlineInterface` method. Then reads the input file line by line and calls appropriate validators to validate the input. As soon as engine reads a valid bitmap matrix it calls an instance of `nearestWhitePixel` class to solve the problem.
### Main
Main is the entry point of the app. It is responsible for creating an instance of `Engine` for each test file and calling `processLineByLine` method. 
Since all methods are implemented asyncronously then it is possible to slove a problem while still reading data of another problem from a file or receive them form perhaph an IOT device.
### Validator
This class is responsible for validating the input. This class accepts input configuration which includes following properties:
- `filePath`: path to the file containing the input
- `valid number of problems`: The default value is 1000
- `valid dimentions`: The default value is 182
- `valid dimention seperator`: The default value is " "
- `valid input seperator`: The default value is ""
In case you want to submit a test case with diffrenet format, it is enough to change the setting of validator.

## Errors and Error Handling

The objective of error handling is to read and solve test cases from a broken file as much as possible. To accomplish this, the app engine reads files line by line until it encounters an error.

Any of the following errors may occur as a result of a faulty test file:

1. Invalid file path error:
This error happens when the file address is in the wrong format, or if the file does not exist.
2. Invalid number of problems error:
This error happens when the number of problems in test file is not a valid integer or is greater than 1000.
3. Invalid test case dimentions error:
This error happens when the number of rows and columns in a test case is not a valid integer or is greater than 182.
4. Invalid entry error:
This error happens when the entry in a test case is not binary or the dimentions do not match the problem specification.
## Tests
In order to test the app, you can use the test files in "mockFiles" directory.
- "bigMockFile.txt" is a file containing 1000 test cases.
- "mockFile.txt" is a file containing 3 test cases.
- "mockFile2.txt" is a file containing 1 test case.
- "invalidNumberOfProblems.txt" is a file with invalid number of test case.
- "invalidDimentions.txt" is a file with invalid test case dimentions.
- "invalidLineEntry.txt" is a file with invalid entry.

If you submit a test file, you can see the output of the app in the terminal. If the test file is valid, the app will print the solution to the test case otherwise it will print the error.

## Asynchronous Processing

At the moment the app is written so that read each test cases from each file and solve them asyncrounously.
So if a file containes a very large test case which takes a long time to read from the file or recieve from IOT device, the app will be able to read other smaller test cases from other files and solve them.
Also the process of solveing and reading a test case can be done asynchronously.
In order to use the full potential of asyncronous features of the app it is better to mark each test case (bitmap matrix) with a unique id so that for each test file it is possible to read smaller test cases (bitmaps with smaller dimentions) first and solve them asynchronously.

## Improvements
- [ ] Add a feature to ask the user for output destination.
- [ ] Add some test cases to improve the test coverage. At this moment test coverage is about 83%
- [ ] Add a feature to ask user for test file configuration at beginning of the app.
