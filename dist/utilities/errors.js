'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports.CustomErrors = void 0;
class CustomErrors {
  invalidFilePath(path) {
    throw new Error(`Invalid file path: ${path} Code 101`);
  }
}
exports.CustomErrors = CustomErrors;
