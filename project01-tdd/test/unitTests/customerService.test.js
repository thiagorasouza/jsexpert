const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const CustomerService = require("../../src/service/customerService.js");

const { join } = require("node:path");
const customersDatabaseFilePath = join(
  __dirname,
  "..",
  "..",
  "database",
  "customers.json"
);

const mocks = {
  validCustomer: require("../mocks/validCustomer.json"),
};

describe("Customer Testing Suite", () => {
  let customerService = {};
  let sandbox = {};

  before(() => {
    customerService = new CustomerService({
      customersDatabaseFilePath,
    });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("given a customer id, should return all the customer information", async () => {
    const customerId = "d5935562-7395-46df-bd65-2ab44634d43d";
    const customerMock = { ...mocks.validCustomer, id: customerId };

    const spy = sandbox
      .stub(
        customerService.customerRepository,
        customerService.customerRepository.find.name
      )
      .resolves(customerMock);

    const response = await customerService.getCustomerById(customerId);
    const expected = customerMock;

    expect(spy.calledOnce).to.be.ok;
    expect(spy.calledWith(customerId)).to.be.ok;
    expect(response).to.be.deep.equal(expected);
  });
});
