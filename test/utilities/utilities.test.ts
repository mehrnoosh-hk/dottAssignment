import {Utils} from '../../src/utilities/utilities';
import * as readline from 'readline';


// Test for create readline interface
describe('Test implementation of Utils class', () => {
  const util = new Utils('test/utilities/mockFile.txt');

  test('Create a readline interface', () => {
    expect(util.rl).toBeDefined();
  });

  test('There is only one instance of readline interface', () => {
    expect(util.rl.length).toBe(1);
  });

  test('The rl property is an instance of readline interface', () => {
    expect(util.rl[0]).toBeInstanceOf(readline.Interface);
  });

  test('Read first line of file', () => {
    expect(util.readNthLine(1)).resolves.toBe('2');
  });

  test('Read the third line of file', () => {
    expect(util.readNthLine(3)).resolves.toBe('1101');
  });

  test('Read the number of problems', () => {
    expect(util.readNumberOfProblems()).resolves.toBe(2);
  });
});

// TODO: Add test for invalid file path
// TODO: Add test for invalid line number
// TODO: Add test for close readline interface


// TODO: A worker process has failed to exit gracefully and has been force
// exited. This is likely caused by tests leaking due to improper teardown.
// Try running with --detectOpenHandles to find leaks.
// Active timers can also cause this, ensure that .unref()
// was called on them.
