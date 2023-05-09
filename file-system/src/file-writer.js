const path = require("node:path");
const makePath = (fileName) => path.join(__dirname, "..", "files", fileName);

// As Promises
const fs = require("node:fs/promises");

async function writeToFile() {
  const filePath = makePath("write.txt");
  console.log(await fs.writeFile(filePath, "This is a new line"));
}

writeToFile();
