[![CI](https://github.com/MehrnooshIO/dottAssignment/actions/workflows/actions.yml/badge.svg?branch=dev)](https://github.com/MehrnooshIO/dottAssignment/actions/workflows/actions.yml)
# Find The Nearest White Pixel In A Bitmap

## Problem Description

There is given a rectangular bitmap of size n*m. Each pixel of the bitmap is either white or black, but at least one is white. The pixel in i-th line and j-th column is called the pixel (i,j). The distance between two pixels p1=(i1,j1) and p2=(i2,j2) is defined as d(p1,p2)=|i1-i2|+|j1-j2|.
This app reads the description of the bitmap from the standard input;
for each pixel, computes the distance to the nearest white and writes the results to the standard output.

Table of contents:

 1. [How to set up and run this app](https://github.com/MehrnooshIO/dottAssignment/tree/dev#how-to-set-up-and-run-this-app)
 2. API Reference
 2.1. Util Class
 2.2. NearestWhitePixel Class
 3. Improvements suggestions: 
 3.1 

## How to Set up and Run this APP

1.  Clone this repository to your local machine
2.  Open the directory of the cloned repository in the terminal and run:

```bash
$ npm install
```
to install required dependencies
3.  Run the app with following command and pass the address to a txt file representing the bitmap, as an argument. you can use any of mockfiles which is provided in repository in "mockFiles" directory.
```bash
$ node dist/app.js adress/to/file
```
4. A correct bitmap representation should adhere to the following rules:

## Errors and Error Handling

The objective of error handling is to read and solve test cases from a broken file as much as possible. To accomplish this, the app engine reads files line by line until it encounters an error.

Any of the following errors may occur as a result of a faulty test file:

1. Wrong file path - Error code 101
This error happens when the file address is in the wrong format, or if the file does not exist.
2. Wrong number of problems in a test file
3. Wrong dimentions of a test case in a test file
4. Wrong entry in a test case
