import {Validation} from '../../src/utilities/classValidator';
import {FileConfig} from '../../src/utilities/config';

describe('Test validators', () => {
  const mockConfig: FileConfig = {
    filePath: '../mockFiles/mockFile.txt',
    maxNumberOfProblems: 1000,
    validDimention: 182,
    dimentionSeperator: ' ',
    rowElementSeperator: '',
    resultSeperator: ' ',
    testCaseSeperator: '\n',
  };
  const validator = new Validation(mockConfig);

  test('Test validator.isValidNumberOfProblems', () => {
    expect(validator.isValidNumberOfProblems('10')).toBe(10);
    expect(validator.isValidNumberOfProblems('0')).toBe(0);
    expect(validator.isValidNumberOfProblems('1')).toBe(1);
    expect(validator.isValidNumberOfProblems('-1')).toBe(0);
    expect(validator.isValidNumberOfProblems('a')).toBe(0);
    expect(validator.isValidNumberOfProblems('1a')).toBe(0);
    expect(validator.isValidNumberOfProblems('1.1')).toBe(0);
    expect(validator.isValidNumberOfProblems('1001')).toBe(0);
  });

  test('Test validator.isValidDimention', () =>{
    expect(validator.isValidDimention('4 4')).toEqual([4, 4]);
    expect(validator.isValidDimention('4 4 4')).toStrictEqual([]);
    expect(validator.isValidDimention('4 4 4 4')).toStrictEqual([]);
    expect(validator.isValidDimention('43')).toStrictEqual([]);
    expect(validator.isValidDimention('A 3')).toStrictEqual([]);
    expect(validator.isValidDimention('3 A')).toStrictEqual([]);
    expect(validator.isValidDimention('3 4')).toStrictEqual([3, 4]);
  });
});
