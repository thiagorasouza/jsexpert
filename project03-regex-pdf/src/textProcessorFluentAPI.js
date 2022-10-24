const { evaluateRegex } = require("./util");

class TextProcessorFluentAPI {
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    const regex = evaluateRegex(
      /(?<=(?:contratante|contratada):\s)[\s\S]*?(?=\.\s*$)/gim
    );
    this.#content = this.#content.match(regex);
    return this;
  }

  divideIntoColumns() {
    this.#content = this.#content.split(",");
    return this;
  }

  trimAndRemoveLineBreaks() {
    this.#content = this.#content.map((item) => item.trim().replace("\n", ""));
    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
