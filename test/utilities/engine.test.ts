import {Engine} from '../../src/utilities/engine';
import {FileConfig} from '../../src/utilities/config';
import {FileService} from '../../src/utilities/fileService';
import {Validation} from '../../src/utilities/classValidator';

describe('Test engine class', () => {
  const mockConfig: FileConfig = {
    filePath: './mockFiles/mockFile.txt',
    maxNumberOfProblems: 1000,
    validDimention: 182,
    dimentionSeperator: ' ',
    rowElementSeperator: '',
    resultSeperator: ' ',
    testCaseSeperator: '\n',
  };
  const engine = new Engine(
      new Validation(mockConfig), new FileService(mockConfig),
  );

  test('Test construction of engine', () => {
    expect(engine).toBeDefined();
  });


  test('Test createReadlineInterface', () => {
    expect(engine.fs).toBeDefined();
  });

  test('Test processLineByLine', async () => {
    const result = await engine.processLineByLine();
    expect(result).toEqual(
        [
          [[0, 0, 1, 0], [1, 1, 2, 1], [1, 0, 1, 0], [2, 1, 0, 1]],
          [[2, 1, 2], [1, 0, 1], [2, 1, 0]],
          [[2, 2, 1, 2], [1, 1, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1]],
        ],
    );
  });
});
