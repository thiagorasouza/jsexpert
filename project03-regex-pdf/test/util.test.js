const { describe, it } = require("mocha");
const { expect } = require("chai");
const { evaluateRegex, InvalidRegexError } = require("../src/util.js");
console.log(InvalidRegexError);

describe("Util Test Suite", () => {
  it("should throw for an invalid regex", () => {
    const unsafe = /^([a-zA-Z0-9]+\s?)+$/;
    expect(() => evaluateRegex(unsafe)).to.throw(
      InvalidRegexError,
      `The regex ${unsafe} is not safe`
    );
  });

  it("should not throw for a valid regex", () => {
    const safe = /^[a-z]$/;
    expect(() => evaluateRegex(safe)).to.not.throw;
    expect(evaluateRegex(safe)).to.be.deep.equal(safe);
  });
});
