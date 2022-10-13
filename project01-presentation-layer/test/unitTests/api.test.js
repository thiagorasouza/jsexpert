const { describe, it, beforeEach, afterEach } = require("mocha");
const {
  server: api,
  carService,
  categoryService,
} = require("../../src/api/api");
const request = require("supertest");
const { expect } = require("chai");
const sinon = require("sinon");

const mocks = {
  validCarCategory: require("../mocks/validCarCategory.json"),
  validCar: require("../mocks/validCar.json"),
};

describe.only("API Test Suite", () => {
  let sandbox = {};

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should retun an available car in a specific category", async () => {
    // GET /category/:categoryId/car
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
});
