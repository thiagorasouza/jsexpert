class CarCategoryService {
  constructor({ carRepository, carCategoryRepository }) {
    this.carRepository = carRepository;
    this.carCategoryRepository = carCategoryRepository;
  }

  async getAvailableCar(categoryId) {
    const carCategory = await this.carCategoryRepository.find(categoryId);
    const carId = this.chooseRandomCarId(carCategory.carIds);
    const car = await this.carRepository.find(carId);
    return car;
  }

  chooseRandomCarId(cars) {
    const randomIndex = this.getRandomIndex(cars.length);
    return cars[randomIndex];
  }

  getRandomIndex(len) {
    return Math.floor(Math.random() * len);
  }
}

module.exports = CarCategoryService;
