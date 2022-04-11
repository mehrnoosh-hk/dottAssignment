"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const fs = __importStar(require("fs"));
/**
 * Validation class contains all methods to validate the input file.
 * All parameters have a default value to determain how the validation
 * will be done. unless the user specifies otherwise.
 */
class Validation {
    /**
       * constructor of the class Validator
       * @param {FileConfig} config The configuration of the submitted problem file.
       */
    constructor(config) {
        this.config = config;
    }
    /**
     * Check if the file path is valid and the file exists
     * @return {boolean}
     */
    isValidAddress() {
        return fs.existsSync(this.config.filePath);
    }
    /**
     * Checks if the number of problems in the submitted file is valid according
     * to the validNumberOfProblems property
     * @param {string}value The number of problems in the submitted file
     * @return {number} The number of problems in the submitted file
     * if it is valid otherwise 0
     */
    isValidNumberOfProblems(value) {
        if (Number(value) <= this.config.maxNumberOfProblems && Number(value) > 0 &&
            Number(value) % 1 === 0) {
            return Number(value);
        }
        return 0;
    }
    /**
       * Check if the string can be converted to number and
       * its value is less than or equal 182
       * @param {string} value
       * @return {number | boolean}
       */
    isValidDimention(value) {
        const dimention = value.split(this.config.dimentionSeperator)
            .map(Number);
        if (dimention.every((element) => element !== NaN) &&
            dimention.every((element) => element <= this.config.validDimention && element > 0 &&
                dimention.length === 2)) {
            return dimention;
        }
        return [];
    }
    /**
       * Check if the string can be converted to a binary array with
       * proper length.
       * return converted array if the string is a binary array
       * @param {string} value
       * @param {number} cols the columns number of the matrix
       * @return {number[] | boolean}
       */
    isValidRow(value, cols) {
        const row = value.split(this.config.rowElementSeperator).map(Number);
        if (row.every((element) => element === 0 || element === 1) &&
            row.length === cols) {
            return row;
        }
        return [];
    }
}
exports.Validation = Validation;
