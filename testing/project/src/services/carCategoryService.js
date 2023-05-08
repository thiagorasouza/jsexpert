const Tax = require("../entities/tax");
const Transaction = require("../entities/transactions");

class CarCategoryService {
  constructor({ carRepository, carCategoryRepository, customerRepository }) {
    this.tax = Tax.taxesBasedOnAge;
    this.currencyFormatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    this.dateFormatter = (date) =>
      date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    this.carRepository = carRepository;
    this.carCategoryRepository = carCategoryRepository;
    this.customerRepository = customerRepository;
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

  async calculateFinalPrice(customerId, categoryId, numberOfDays) {
    const customer = await this.customerRepository.find(customerId);
    const carCategory = await this.carCategoryRepository.find(categoryId);
    const tax = this.getTaxFromAge(customer.age);

    const finalPrice = carCategory.price * tax * numberOfDays;

    return this.currencyFormatter.format(finalPrice);
  }

  getTaxFromAge(age) {
    const { multiplier: tax } = this.tax.find(
      (range) => age >= range.from && age < range.to
    );
    return tax;
  }

  async rent(customerId, categoryId, numberOfDays) {
    const customer = await this.customerRepository.find(customerId);
    const car = await this.getAvailableCar(categoryId);
    const finalPrice = await this.calculateFinalPrice(
      customerId,
      categoryId,
      numberOfDays
    );
    const today = new Date();
    const dueDate = new Date(today.setDate(today.getDate() + numberOfDays));

    return new Transaction({
      customer,
      car,
      finalPrice,
      dueDate: this.dateFormatter(dueDate),
    });
  }
}

module.exports = CarCategoryService;
