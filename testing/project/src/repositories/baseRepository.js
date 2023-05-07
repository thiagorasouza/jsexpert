const { readFile } = require("node:fs/promises");

class BaseRepository {
  constructor({ filePath }) {
    this.filePath = filePath;
  }

  async find(itemId) {
    const content = JSON.parse(await readFile(this.filePath));
    if (!itemId) {
      return content;
    }

    return content.find(({ id }) => id === itemId);
  }
}

module.exports = BaseRepository;
