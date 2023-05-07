const { errors } = require("./constants");
const assert = require("node:assert");

const File = require("./file");

(async () => {
  {
    const filePath = "./mocks/empty-file.csv";
    const result = File.csvToJson(filePath);
    const expected = new Error(errors.EMPTY_FILE);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/empty-content.csv";
    const result = File.csvToJson(filePath);
    const expected = new Error(errors.EMPTY_CONTENT);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/invalid-headers.csv";
    const result = File.csvToJson(filePath);
    const expected = new Error(errors.INVALID_HEADERS);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/long-file.csv";
    const result = File.csvToJson(filePath);
    const expected = new Error(errors.LONG_FILE);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/all-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        id: "1",
        name: "john",
        profession: "developer",
        age: 25
      },
      {
        id: "2",
        name: "joe",
        profession: "developer",
        age: 30
      },
      {
        id: "3",
        name: "ana",
        profession: "QA",
        age: 28
      },
    ]
    assert.deepEqual(result, expected);
  }
})();