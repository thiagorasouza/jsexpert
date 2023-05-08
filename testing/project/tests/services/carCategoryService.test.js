const { describe, it, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");

const CarCategoryService = require("../../src/services/carCategoryService");
const Transaction = require("../../src/entities/transactions");

const mocks = {
  car: require("../mocks/car.json"),
  carCategory: require("../mocks/carCategory.json"),
  customer: require("../mocks/customer.json"),
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

const makeCustomerRepositoryStub = () => {
  class CustomerRepositoryStub {
    async find() {
      return mocks.customer;
    }
  }

  return new CustomerRepositoryStub();
};

const makeSut = () => {
  const carRepositoryStub = makeCarRepositoryStub();
  const carCategoryRepositoryStub = makeCarCategoryRepositoryStub();
  const customerRepositoryStub = makeCustomerRepositoryStub();
  const sut = new CarCategoryService({
    carRepository: carRepositoryStub,
    carCategoryRepository: carCategoryRepositoryStub,
    customerRepository: customerRepositoryStub,
  });

  return {
    sut,
    carRepositoryStub,
    carCategoryRepositoryStub,
    customerRepositoryStub,
  };
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

  describe("getTaxFromAge()", () => {
    it("should return the tax for the age range", () => {
      const { sut } = makeSut();
      sandbox.stub(sut, "tax").get(() => [
        { from: 10, to: 20, multiplier: 2 },
        { from: 20, to: 30, multiplier: 3 },
      ]);

      const age = 25;
      const result = sut.getTaxFromAge(age);
      const expected = 3;

      expect(result).to.be.equal(expected);
    });
  });

  describe("calculateFinalPrice()", () => {
    it("should calculate final price given customer id, category id and number of rental days", async () => {
      const { sut, carCategoryRepositoryStub } = makeSut();

      const mockPrice = 37.6;
      sandbox
        .stub(carCategoryRepositoryStub, carCategoryRepositoryStub.find.name)
        .resolves({
          ...mocks.carCategory,
          price: mockPrice,
        });

      const mockTax = 1.3;
      sandbox.stub(sut, sut.getTaxFromAge.name).returns(mockTax);

      const customerId = "valid_customer_id";
      const categoryId = "valid_category_id";
      const numberOfDays = 5;

      const result = await sut.calculateFinalPrice(
        customerId,
        categoryId,
        numberOfDays
      );
      const expected = sut.currencyFormatter.format(244.4);

      expect(result).to.be.equal(expected);
    });
  });

  describe("rent()", () => {
    it("should return the customer, the car, the final price and the due date", async () => {
      const { sut, customerRepositoryStub } = makeSut();

      const customerId = "valid_customer_id";
      const categoryId = "valid_category_id";
      const numberOfDays = 5;

      const finalPrice = sut.currencyFormatter.format(244.4);
      const today = new Date("2020", "10", "5");
      const clock = sandbox.useFakeTimers(today.getTime());
      const dueDate = new Date(today.setDate(today.getDate() + 5));

      sandbox
        .stub(customerRepositoryStub, customerRepositoryStub.find.name)
        .withArgs(customerId)
        .resolves(mocks.customer);
      sandbox
        .stub(sut, sut.getAvailableCar.name)
        .withArgs(categoryId)
        .resolves(mocks.car);
      sandbox
        .stub(sut, sut.calculateFinalPrice.name)
        .withArgs(customerId, categoryId, numberOfDays)
        .resolves(finalPrice);

      const result = await sut.rent(customerId, categoryId, numberOfDays);
      const expected = new Transaction({
        customer: mocks.customer,
        car: mocks.car,
        finalPrice,
        dueDate: sut.dateFormatter(dueDate),
      });

      expect(result).to.be.deep.equal(expected);

      clock.restore();
    });
  });
});
