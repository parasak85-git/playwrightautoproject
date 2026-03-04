/* 
1) 'fs' is a built-in Node.js module used to read files from the file system 
   (external files like JSON, Excel, or CSV).

2) { parse } is a named export from 'csv-parse/sync' used to convert CSV 
   formatted text data into structured JavaScript objects.

3) JSON.parse() is a built-in JavaScript method used to convert a JSON 
   formatted string into a structured JavaScript object.

4) 'xlsx' is a third-party library used to read and write Excel files. 
   It converts Excel sheet data into structured JavaScript objects.
*/

import fs from 'fs';
import { parse } from 'csv-parse/sync';
import * as xlsx from 'xlsx';

export class DataProviders {
    static readDataFromJsonFile(filePath: string) {
        const jsonFormattedStringData = fs.readFileSync(filePath, 'utf8');
        const convertedJsObject = JSON.parse(jsonFormattedStringData);
        return convertedJsObject;
    }

    static readDataFromCsvFile(filePath: string) {
        const csvFormattedTextData = fs.readFileSync(filePath, 'utf8');
        const convertedJsObject = parse(csvFormattedTextData, { columns: true, skip_empty_lines: true });
        return convertedJsObject;
    }

    static readDataFromExcelFile(filePath: string, sheetName?: string) {
        const workbook = xlsx.readFile(filePath);
        const worksheetToRead = sheetName || workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetToRead];
        const convertedJsObject = xlsx.utils.sheet_to_json(worksheet);
        return convertedJsObject;
    }
}