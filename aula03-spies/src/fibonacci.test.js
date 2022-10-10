const Fibonacci = require("./fibonacci");
const sinon = require("sinon");
const { deepStrictEqual } = require("node:assert");

(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const expectedCallCount = 4;
    for (const value of fibonacci.execute(3)) {
    }
    deepStrictEqual(spy.callCount, expectedCallCount);
  }

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const [...results] = fibonacci.execute(5);
    const { args } = spy.getCall(2);
    // 0 - input: 5, current: 0, next: 1
    // 1 - input: 4, current: 1, next: 1
    // 2 - input: 3, current: 1, next: 2
    // 3 - input: 2, current: 2, next: 3
    // 4 - input: 1, current: 3, next: 5
    // 5 - input: 0 --------------------
    // console.log(results);
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });
    const expectedResults = [0, 1, 1, 2, 3];
    deepStrictEqual(args, expectedParams);
    deepStrictEqual(results, expectedResults);
  }
})();
