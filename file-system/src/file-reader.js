const path = require("node:path");
const makePath = (fileName) => path.join(__dirname, "..", "files", fileName);

// As Promises
const fs = require("node:fs/promises");

// async function readSmallFile() {
//   const filePath = makePath("read-small.txt");
//   const content = await fs.readFile(filePath, "utf-8");
//   console.log("🚀 ~ content:", content);
// }

async function readBigFile() {
  const filePath = makePath("read-big.txt");
  const content = await fs.readFile(filePath, "utf-8");
  console.log("🚀 ~ content:", content);
}

// readSmallFile();
readBigFile();
