const errors = require("./src/errors");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("node:assert");

(async () => {
  // const result = await File.csvToJson("./mocks/missingHeaders-invalid.csv");
  // const result = await File.csvToJson("./mocks/fourItems-invalid.csv");
  // console.log("result:", result);
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(errors.INVALID_CONTENT_LENGTH);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(errors.INVALID_CONTENT_LENGTH);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/missingHeaders-invalid.csv";
    const rejection = new Error(errors.INVALID_HEADERS);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = '[{"id":"001","name":"Thiago","profession":"Engineer","age":"29"},{"id":"002","name":"Alice","profession":"Manager","age":"25"},{"id":"003","name":"Rafaela","profession":"Architect","age":"32"}]';
    deepStrictEqual(result, expected);
  }
})();