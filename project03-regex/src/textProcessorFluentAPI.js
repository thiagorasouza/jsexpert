const Person = require("./person");
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
    this.#content = this.#content.map((item) => item.split(","));
    return this;
  }

  trimAndRemoveLineBreaks() {
    this.#content = this.#content.map((item) =>
      item.map((line) => line.trim().replace("\n", ""))
    );
    return this;
  }

  mapPerson() {
    this.#content = this.#content.map((item) => new Person(item));
    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
