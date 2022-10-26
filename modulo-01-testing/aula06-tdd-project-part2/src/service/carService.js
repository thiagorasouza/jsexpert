const BaseRepository = require("../repository/base/baseRepository");

class CarService {
  constructor({ carsDatabaseFilePath }) {
    this.carRepository = new BaseRepository({ filePath: carsDatabaseFilePath });
  }

  getRandomPositionFromArray(data) {
    const length = data.length;
    const randomIndex = Math.floor(Math.random() * length);
    return randomIndex;
  }

  chooseRandomCar(carCategory) {
    const randomIndex = this.getRandomPositionFromArray(carCategory.carIds);
    return carCategory.carIds[randomIndex];
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    return await this.carRepository.find(carId);
  }
}

module.exports = CarService;
