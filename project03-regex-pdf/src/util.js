const safeRegex = require("safe-regex");

class InvalidRegexError extends Error {
  constructor(exp) {
    super(`The regex ${exp} is not safe.`);
    this.name = "InvalidRegexError";
  }
}

const evaluateRegex = (exp) => {
  const isSafe = safeRegex(exp);

  if (isSafe) {
    return exp;
  } else {
    throw new InvalidRegexError(exp);
  }
};

module.exports = { InvalidRegexError, evaluateRegex };
