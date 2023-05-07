const Fibonacci = require("./fibonacci");
const sinon = require("sinon").createSandbox();
const assert = require("node:assert");

(async() => {
  {
    const fibonacci = new Fibonacci();
    const results = [...fibonacci.execute(5)];
    const expected = [0, 1, 1, 2, 3];
    assert.deepStrictEqual(results, expected);
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const results = [...fibonacci.execute(5)];    
    const expectedCallCount = 6;
    assert.strictEqual(spy.callCount, expectedCallCount);
  }
})();