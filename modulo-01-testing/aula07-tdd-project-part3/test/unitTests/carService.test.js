const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const CarService = require("../../src/service/carService");
const Transaction = require("../../src/entities/transaction");

const { join } = require("node:path");
const carsDatabaseFilePath = join(
  __dirname,
  "..",
  "..",
  "database",
  "cars.json"
);

const mocks = {
  validCarCategory: require("../mocks/validCarCategory.json"),
  validCar: require("../mocks/validCar.json"),
  validCustomer: require("../mocks/validCustomer.json"),
};

describe("CarService Testing Suite", () => {
  let carService = {};
  let sandbox = {};

  before(() => {
    carService = new CarService({ carsDatabaseFilePath });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should return a random position from an array", () => {
    const data = [0, 1, 2, 3, 4];
    const result = carService.getRandomPositionFromArray(data);
    expect(result)
      .to.be.least(0)
      .most(data.length - 1);
  });

  it("should return a random car from the provided car category", () => {
    const carCategory = mocks.validCarCategory;
    const expectedCarIdIndex = 0;
    const expectedCarId = carCategory.carIds[expectedCarIdIndex];

    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(expectedCarIdIndex);

    const result = carService.chooseRandomCar(carCategory);
    expect(result).to.be.equal(expectedCarId);
    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
  });

  it("given a car category it should return an available car", async () => {
    const carCategory = Object.create(mocks.validCarCategory);
    const car = mocks.validCar;
    carCategory.carIds = [car.id];

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    sandbox.spy(carService, carService.chooseRandomCar.name);

    const result = await carService.getAvailableCar(carCategory);
    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;
    expect(result).to.be.deep.equal(car);
  });

  it("given a car category, a customer and the number of days, it should calculate the final price", async () => {
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.price = 37.6;

    const customer = Object.create(mocks.validCustomer);
    customer.age = 50;

    const numberOfDays = 5;

    sandbox
      .stub(carService, "taxes")
      .get(() => [{ from: 40, to: 50, then: 1.3 }]);

    const result = carService.calculateFinalPrice(
      carCategory,
      customer,
      numberOfDays
    );
    const expected = carService.currencyFormat.format(244.4);

    expect(result).to.be.deep.equal(expected);
  });

  it("given a car category, a custimer and the number of days, it should return the transaction data", async () => {
    const customer = { ...mocks.validCustomer, age: 50 };
    const car = { ...mocks.validCar };
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id],
    };

    const finalPrice = carService.currencyFormat.format(244.4);

    const actualDate = new Date(2022, 10, 5);
    sandbox.useFakeTimers(actualDate.getTime());
    const numberOfDays = 5;
    const dueDate = "10 de novembro de 2022";

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    sandbox
      .stub(carService, "taxes")
      .get(() => [{ from: 40, to: 50, then: 1.3 }]);

    const result = await carService.rent(carCategory, customer, numberOfDays);
    const expected = new Transaction({
      customer,
      car,
      finalPrice,
      dueDate,
    });

    expect(result).to.be.deep.equal(expected);
  });
});
