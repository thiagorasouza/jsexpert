const BaseRepository = require("./baseRepository");

class CarCategoryRepository extends BaseRepository {
  constructor({ filePath }) {
    super({ filePath });
  }
}

module.exports = CarCategoryRepository;
