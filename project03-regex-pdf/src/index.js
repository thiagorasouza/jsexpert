const { readFile } = require("node:fs/promises");
const { join } = require("node:path");
const pdf = require("pdf-parse");

(async () => {
  const data = await readFile(join(__dirname, "..", "contrato.pdf"));
  const content = await pdf(data);
  console.log(content.text);
})();
