const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const CarService = require("../../src/service/carService");

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
    const carCategory = mocks.validCarCategory;
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
});
