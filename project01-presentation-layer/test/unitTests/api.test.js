const { describe, it, beforeEach, afterEach } = require("mocha");
const {
  server: api,
  carService,
  categoryService,
  customerService,
} = require("../../src/api/api");
const request = require("supertest");
const { expect } = require("chai");
const sinon = require("sinon");
const Transaction = require("../../src/entities/transaction");

const mocks = {
  validCarCategory: require("../mocks/validCarCategory.json"),
  validCar: require("../mocks/validCar.json"),
  validCustomer: require("../mocks/validCustomer.json"),
};

describe("API Test Suite", () => {
  let sandbox = {};

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  // GET /category/:categoryId/car
  it("should retun an available car for a specific category", async () => {
    const carCategoriesMock = mocks.validCarCategory;
    const carMock = mocks.validCar;

    const categoryId = carCategoriesMock.id;
    const url = `/category/${categoryId}/car`;

    sandbox
      .stub(categoryService, categoryService.getCategoryById.name)
      .resolves(carCategoriesMock);

    sandbox.stub(carService, carService.getAvailableCar.name).resolves(carMock);

    const response = await request(api)
      .get(url)
      .expect(200)
      .expect("Content-Type", /json/);
    const expected = carMock;

    expect(response.body).to.be.deep.equal(expected);
  });

  // GET /deal/:categoryId/:customerId/:numberOfDays
  it("should return the final price for a given deal", async () => {
    const carCategoryMock = Object.create(mocks.validCarCategory);
    carCategoryMock.price = 37.6;
    const customerMock = Object.create(mocks.validCustomer);
    customerMock.age = 50;

    const categoryId = carCategoryMock.id;
    const customerId = customerMock.id;
    const numberOfDays = 5;

    const url = `/deal/${categoryId}/${customerId}/${numberOfDays}`;

    sandbox
      .stub(categoryService, categoryService.getCategoryById.name)
      .resolves(carCategoryMock);

    sandbox
      .stub(customerService, customerService.getCustomerById.name)
      .resolves(customerMock);

    const response = await request(api)
      .get(url)
      .expect(200)
      .expect("Content-Type", /json/);
    const expected = carService.currencyFormat.format(244.4);

    expect(response.body).to.be.deep.equal(expected);
  });

  // POST /order
  it("shold return the transaction information for a given order", async () => {
    const car = mocks.validCar;
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id],
    };
    const customer = { ...mocks.validCustomer, age: 50 };
    const numberOfDays = 5;
    const finalPrice = carService.currencyFormat.format(244.4);
    const dueDate = "10 de novembro de 2022";

    const actualDate = new Date(2022, 10, 5);
    sandbox.useFakeTimers(actualDate.getTime());

    sandbox
      .stub(categoryService, categoryService.getCategoryById.name)
      .resolves(carCategory);

    sandbox
      .stub(customerService, customerService.getCustomerById.name)
      .resolves(customer);

    sandbox.stub(carService, carService.getAvailableCar.name).resolves(car);

    const url = "/order";

    const response = await request(api)
      .post(url)
      .send({
        carCategory,
        customer,
        numberOfDays,
      })
      .expect(200)
      .expect("Content-Type", /json/);
    const expected = new Transaction({
      customer,
      car,
      finalPrice,
      dueDate,
    });

    expect(response.body).to.be.deep.equal(expected);
  });
});
