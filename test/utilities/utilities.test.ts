import { CreateReadlineInterface, ReadNthLine } from '../../src/utilities/utilities';

// Test for create readline interface 
describe('Create ReadLine Interface', () => {
    test('Create a readline interface', () => {
        let filepath = "test/utilities/mockText.txt";
        CreateReadlineInterface(filepath).then((rl) => {
            expect(rl).toBeDefined();
            rl.close();
        });
    });

    test('Create a readline interface with invalid filepath', () => {
        let filepath = "test/utilities/wrong.txt";
        CreateReadlineInterface(filepath).then((rl) => {
            expect(rl).toBeDefined();
            rl.close();
        }).catch((err) => {
            expect(err).toThrow('File not found')
        });
    });
})



// TODO: A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.
// TODO: Create Test Classes

// Test for create readline interface with invalid file path
// test('Create a readline interface with invalid file path', () => {
//     let filepath = "test/utilities/wrongName.txt";
//     expect(() => CreateReadlineInterface(filepath)).toThrow();
// })

// Test the read nth line of a file
// describe('Read the nth line of a txt file', () => {

//     let filepath = "test/utilities/mockFile.txt";
//     let rl = CreateReadlineInterface(filepath);

//     test('Read the first line of a file', async () => {
//         let n = 1;
//         const line = await ReadNthLine(rl, n);
//         expect(line).toBe("2");
//     });

//     rl.close();
// })