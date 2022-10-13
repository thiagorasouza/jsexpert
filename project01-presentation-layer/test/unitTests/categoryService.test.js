const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const CategoryService = require("../../src/service/categoryService");

const { join } = require("node:path");
const categoriesDatabaseFilePath = join(
  __dirname,
  "..",
  "..",
  "database",
  "carCategories.json"
);

const mocks = {
  validCarCategory: require("../mocks/validCarCategory.json"),
};

describe("CarCategory Testing Suite", () => {
  let carCategoryService = {};
  let sandbox = {};

  before(() => {
    carCategoryService = new CategoryService({ categoriesDatabaseFilePath });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("given a category id, should return all the category information", async () => {
    const carCategoryId = "d8f63fb7-a6b6-40a0-81a0-52013020fbf8";
    const carCategoryMock = { ...mocks.validCarCategory, id: carCategoryId };

    const spy = sandbox
      .stub(
        carCategoryService.categoryRepository,
        carCategoryService.categoryRepository.find.name
      )
      .resolves(carCategoryMock);

    const response = await carCategoryService.getCategoryById(carCategoryId);
    const expected = carCategoryMock;

    expect(spy.calledOnce).to.be.ok;
    expect(spy.calledWith(carCategoryId)).to.be.ok;
    expect(response).to.be.deep.equal(expected);
  });
});
