export class FileConfig {

    public filePath: string;
    public maxNumberOfProblems: number;
    public validDimention: number;
    public dimentionSeperator: string;
    public rowElementSeperator: string;
    public resultSeperator: string;
    public testCaseSeperator: string;

    constructor(
        filePath: string = './mockFiles/mockFile.txt',
        maxNumberOfProblems: number = 1000,
        validDimention: number = 182,
        dimentionSeperator: string = ' ',
        rowElementSeperator: string = '',
        resultSeperator: string = ' ',
        testCaseSeperator: string = '\n'
    ) {
        this.filePath = filePath;
        this.maxNumberOfProblems = maxNumberOfProblems;
        this.validDimention = validDimention;
        this.dimentionSeperator = dimentionSeperator;
        this.rowElementSeperator = rowElementSeperator;
        this.resultSeperator = resultSeperator;
        this.testCaseSeperator = testCaseSeperator;
    }
}