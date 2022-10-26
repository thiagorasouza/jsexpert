const TextProcessorFluentAPI = require("./textProcessorFluentAPI");

class TextProcessorFacade {
  #textProcessorFluentApi;

  constructor(text) {
    this.#textProcessorFluentApi = new TextProcessorFluentAPI(text);
  }

  getPeopleFromPDF() {
    return this.#textProcessorFluentApi
      .extractPeopleData()
      .divideIntoColumns()
      .trimAndRemoveLineBreaks()
      .mapPerson()
      .build();
  }
}

module.exports = TextProcessorFacade;
