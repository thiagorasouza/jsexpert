const { describe, it, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");

const CarCategoryService = require("../../src/services/carCategoryService");

const mocks = {
  car: require("../mocks/car.json"),
  carCategory: require("../mocks/carCategory.json"),
};

const makeCarRepositoryStub = () => {
  class CarRepositoryStub {
    async find() {
      return mocks.car;
    }
  }

  return new CarRepositoryStub();
};

const makeCarCategoryRepositoryStub = () => {
  class CarCategoryRepositoryStub {
    async find() {
      return mocks.carCategory;
    }
  }

  return new CarCategoryRepositoryStub();
};

const makeSut = () => {
  const carRepositoryStub = makeCarRepositoryStub();
  const carCategoryRepositoryStub = makeCarCategoryRepositoryStub();
  const sut = new CarCategoryService({
    carRepository: carRepositoryStub,
    carCategoryRepository: carCategoryRepositoryStub,
  });

  return { sut, carRepositoryStub, carCategoryRepositoryStub };
};

describe("CarCategoryService Test Suite", () => {
  let sandbox = {};

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("getRandomIndex()", () => {
    it("should return a random valid array index", () => {
      const { sut } = makeSut();
      const len = 5;
      const result = sut.getRandomIndex(len);

      expect(result)
        .to.be.gte(0)
        .and.to.be.lte(len - 1);
    });
  });

  describe("chooseRandomCar()", () => {
    it("should return a random car id given a car ids array", () => {
      const { sut } = makeSut();
      sandbox.stub(sut, sut.getRandomIndex.name).returns(0);
      const cars = mocks.carCategory.carIds;
      const result = sut.chooseRandomCarId(cars);

      expect(result).to.be.deep.equal(cars[0]);
    });
  });

  describe("getAvailableCar()", () => {
    it("should call carCategoryRepository with correct value", async () => {
      const { sut, carCategoryRepositoryStub } = makeSut();
      const findSpy = sandbox.spy(
        carCategoryRepositoryStub,
        carCategoryRepositoryStub.find.name
      );

      await sut.getAvailableCar("valid_categoryId");

      expect(findSpy.callCount).to.be.equal(1);
      expect(findSpy.calledWith("valid_categoryId")).to.be.true;
    });

    it("should call chooseRandomCarId with correct value", async () => {
      const { sut } = makeSut();
      const chooseSpy = sandbox.spy(sut, sut.chooseRandomCarId.name);

      await sut.getAvailableCar("valid_categoryId");

      expect(chooseSpy.callCount).to.be.equal(1);
      expect(chooseSpy.calledWith(mocks.carCategory.carIds)).to.be.true;
    });

    it("should call carRepository with correct value", async () => {
      const { sut, carRepositoryStub } = makeSut();
      const carId = mocks.car.id;
      sinon.stub(sut, sut.chooseRandomCarId.name).returns(carId);
      const findSpy = sandbox.spy(
        carRepositoryStub,
        carRepositoryStub.find.name
      );

      await sut.getAvailableCar("valid_categoryId");

      expect(findSpy.callCount).to.be.equal(1);
      expect(findSpy.calledWith(carId)).to.be.true;
    });

    it("should return an available car in a category", async () => {
      const { sut } = makeSut();

      const result = await sut.getAvailableCar("valid_categoryId");
      const expected = mocks.car;

      expect(result).to.be.deep.equal(expected);
    });
  });
});
