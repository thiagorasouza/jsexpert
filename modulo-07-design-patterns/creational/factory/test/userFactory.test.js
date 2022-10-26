const { deepStrictEqual } = require("node:assert");
const rewireMock = require("rewiremock/node");

class MockDatabase {
  connect = async () => this;
  find = async () => [{ name: "Jack", age: 20 }];
}

rewireMock(() => require("../src/util/database.js")).with(MockDatabase);

(async () => {
  {
    rewireMock.enable();
    const UserFactory = require("../src/factory/userFactory");
    const user = await UserFactory.getInstance();
    const result = await user.find();
    const expected = [{ name: "JACK", age: 20 }];
    deepStrictEqual(result, expected);
    rewireMock.disable();
  }
})();
