const BaseRepository = require("../repository/base/baseRepository");
const Tax = require("../entities/tax");
const Transaction = require("../entities/transaction");

class CarService {
  constructor({ carsDatabaseFilePath }) {
    this.carRepository = new BaseRepository({ filePath: carsDatabaseFilePath });
    this.currencyFormat = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    this.taxes = Tax.taxBasedOnAge;
  }

  formatDate(date) {
    return date.toLocaleString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

  calculateFinalPrice(carCategory, customer, numberOfDays) {
    const { price } = carCategory;
    const { age } = customer;
    const { then: tax } = this.taxes.find(
      (tax) => age >= tax.from && age <= tax.to
    );
    const finalPrice = price * tax * numberOfDays;
    const formattedPrice = this.currencyFormat.format(finalPrice);
    return formattedPrice;
  }

  async rent(carCategory, customer, numberOfDays) {
    const car = await this.getAvailableCar(carCategory);
    const finalPrice = this.calculateFinalPrice(
      carCategory,
      customer,
      numberOfDays
    );

    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);
    const dueDate = this.formatDate(today);

    return new Transaction({ customer, car, finalPrice, dueDate });
  }
}

module.exports = CarService;
