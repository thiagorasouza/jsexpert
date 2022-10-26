const { readFile } = require("node:fs/promises");
const { join } = require("node:path");
const pdf = require("pdf-parse");
const TextProcessorFacade = require("./textProcessorFacade");

(async () => {
  const data = await readFile(join(__dirname, "..", "contrato.pdf"));
  const content = await pdf(data);
  const textProcessor = new TextProcessorFacade(content.text);
  const people = textProcessor.getPeopleFromPDF();
  console.log("🚀 ~ people", people);
})();
