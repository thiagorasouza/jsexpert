const BaseRepository = require("./baseRepository");

class CarRepository extends BaseRepository {
  constructor({ filePath }) {
    super({ filePath });
  }
}

module.exports = CarRepository;
