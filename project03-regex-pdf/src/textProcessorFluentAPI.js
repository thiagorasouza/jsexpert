class TextProcessorFluentAPI {
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    const regex = /(?<=(?:contratante|contratada)\:\s)[\s\S]*?(?=\.\s*$)/gim;
    this.#content = this.#content.match(regex);
    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
