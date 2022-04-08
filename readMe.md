[![CI](https://github.com/MehrnooshIO/dottAssignment/actions/workflows/actions.yml/badge.svg?branch=dev)](https://github.com/MehrnooshIO/dottAssignment/actions/workflows/actions.yml)
# Find The Nearest White Pixel In A Bitmap

## Problem Description

There is given a rectangular bitmap of size n*m. Each pixel of the bitmap is either white or black, but at least one is white. The pixel in i-th line and j-th column is called the pixel (i,j). The distance between two pixels p1=(i1,j1) and p2=(i2,j2) is defined as d(p1,p2)=|i1-i2|+|j1-j2|.
This app reads the description of the bitmap from the standard input;
for each pixel, computes the distance to the nearest white and writes the results to the standard output.

Table of contents:

 1. [How to set up and run this app](https://github.com/MehrnooshIO/dottAssignment/tree/dev#how-to-set-up-and-run-this-app)
 2. Reference
 3. Errors and Error Handling 
 4. Tests
 5. Improvements suggestions: 
  

## How to Set up and Run this APP

1.  Clone this repository to your local machine
2.  Open the directory of the cloned repository in the terminal and run:

```bash
$ npm install
```
to install required dependencies

3.  Run the app with following command 
```bash
$ node dist/app.js
```
The app asks for file path to the file containing problem cases. you can use any of mockfiles which is provided in repository in "mockFiles" directory.

4. A correct bitmap representation should adhere to the following rules:

## Refrence
### Engine
Engine is the core of the app. It is responsible for reading the input file, processing the input, sending it to be solved and writing the output.
Engine main method is `processLineByLine` which recives the filepath, and creates a read stream by calling `createReadlineInterface` method. Then reads the input file line by line and calls appropriate validators to validate the input. As soon as engine reads a valid bitmap matrix it calls an instance of `nearestWhitePixel` class to solve the problem.
### Main
Main is the entry point of the app. It is responsible for creating an instance of `Engine` for each test file and calling `processLineByLine` method. 
Since all methods are implemented asyncronously then it is possible to slove a problem while still reading data of another problem from a file or receive them form perhaph an IOT device. 

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
