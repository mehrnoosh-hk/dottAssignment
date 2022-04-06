import { CreateReadlineInterface, ReadNthLine,
        ReadNumberOfProblems } from '../../src/utilities/utilities';


const filePath = 'test/utilities/mockFile.txt';

// Test for create readline interface 
describe('Create ReadLine Interface', () => {
    test('Create a readline interface', () => {
        CreateReadlineInterface(filePath).then((rl) => {
            expect(rl).toBeDefined();
            rl.close();
        });
    });

    // TODO: Add test for invalid file path
})



// TODO: A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.


// Test the read nth line of a file
describe('Read the nth line of a txt file', () => {

    test('Read the first line of a file', async () => {
        let n = 1;
        CreateReadlineInterface(filePath).then((rl) => {
            ReadNthLine(rl, n).then((line) => {
                expect(line).toBe("2");
                rl.close();
            });
        })
    });

    test('Read Third line of file', () => {
        let n = 3;
        CreateReadlineInterface(filePath).then((rl) => {
            ReadNthLine(rl, n).then((line) => {
                expect(line).toBe("1101");
                rl.close();
            });
        })
    });

    test('Read a line that does not exist', () => {
        let n = 100;
        CreateReadlineInterface(filePath).then((rl) => {
            ReadNthLine(rl, n).then((line) => {
                expect(line).toBe("");
                rl.close();
            });
        })
    });
})


describe('Read the number of problems in a file', () => {

    test('Read the number of problems in a file', async () => {
        const numberOfProblems = await ReadNumberOfProblems(filePath);
        expect(numberOfProblems).toBe(2);
    });
});
