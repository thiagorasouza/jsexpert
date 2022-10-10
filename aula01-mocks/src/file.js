const { readFile } = require("node:fs/promises");
const { join } = require("node:path");
const errors = require("./errors");

const DEFAULT_VALIDATION_OPTIONS = {
  header: ["id","name","profession","age"],
  maxLines: 3
}

class File {
  static async csvToJson(filePath) {
    const csvString = await File.getFileContent(filePath);
    const validation = File.isValid(csvString);
    if (!validation.valid) throw new Error(validation.error);
    const json = File.parseCsvToJson(csvString);
    return json;
  }

  static async getFileContent(filePath) {
    const content = (await readFile(filePath)).toString("utf8");
    return content;
  }

  static isValid(content, options = DEFAULT_VALIDATION_OPTIONS) {
    const [header, ...lines] = content.split("\n");
    const isHeaderValid = header === options.header.join(",");
    if (!isHeaderValid) {
      return {
        error: errors.INVALID_HEADERS,
        valid: false
      }
    }

    const isContentLengthValid = 
      lines.length > 0 &&
      lines.length <= options.maxLines;
    if (!isContentLengthValid) {
      return {
        error: errors.INVALID_CONTENT_LENGTH,
        valid: false
      }
    }

    return {
      valid: true
    }
  }

  static parseCsvToJson(csvString) {
    const [firstLine, ...lines] = csvString.split("\n");
    const header = firstLine.split(",");

    const users = lines.map(line => {
      const columns = line.split(",");      
      const user = columns.reduce((obj, value, i) => {
        obj[header[i]] = value;
        return obj;
      }, {});

      return user;
    });

    return JSON.stringify(users);
  }
}

module.exports = File