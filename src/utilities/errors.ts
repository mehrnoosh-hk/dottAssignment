export class CustomErrors {

    invalidFilePath(path: string) {
        throw new Error( `Invalid file path: ${path} Code 101`);
    }


}