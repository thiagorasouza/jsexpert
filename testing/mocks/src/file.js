const { errors } = require("./constants");
const { readFile } = require("node:fs/promises");

const DEFAULT_HEADERS = "id,name,profession,age";
const DEFAULT_CONTENT_LIMIT = 3;

class File {
  static async csvToJson(filePath) {
    const csvString = await readFile(filePath, { encoding: "utf-8" })
    console.log("🚀 ~ filePath:", filePath)
    console.log("🚀 ~ fileContent:", csvString);
    console.log("\n");
    const isValid = File.isValid(csvString)
    if (!isValid.valid) {
      throw new Error (isValid.error);
    }

    return File.parseCsvToJson(csvString);
  }

  static isValid(csvString) {
    if (csvString === "") {
      return {
        valid: false,
        error: errors.EMPTY_FILE
      } 
    }

    const [headers, ...content] = csvString.split(/\r?\n/);
    if (headers !== DEFAULT_HEADERS) {
      return {
        valid: false,
        error: errors.INVALID_HEADERS
      }
    }

    if (content.length === 0) {
      return {
        valid: false,
        error: errors.EMPTY_CONTENT
      } 
    } else if (content.length > DEFAULT_CONTENT_LIMIT) {
      return {
        valid: false,
        error: errors.LONG_FILE
      } 
    }

    return {
      valid: true
    }
  }

  static parseCsvToJson(csvString) {
    const [header, ...content] = csvString.split(/\r?\n/);
    const headers = header.split(",");

    return content.map((line) => {
      const fields = line.split(",");
      return fields.reduce((obj, field, i) => {
        obj[headers[i]] = field;
        return obj;
      }, {})
    });
  }
} 

module.exports = File;