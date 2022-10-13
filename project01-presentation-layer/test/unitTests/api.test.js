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
});
