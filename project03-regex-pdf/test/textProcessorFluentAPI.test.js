const { describe, it } = require("mocha");
const { expect } = require("chai");
const TextProcessorFluentAPI = require("../src/textProcessorFluentAPI.js");
const contractPeople = require("../mocks/contract-people");

describe("TextProcessorFluentAPI Test Suite", () => {
  it("builds", () => {
    const result = new TextProcessorFluentAPI(contractPeople).build();
    const expected = contractPeople;
    expect(result).to.be.deep.equal(expected);
  });

  it("extracts people data", () => {
    const result = new TextProcessorFluentAPI(contractPeople)
      .extractPeopleData()
      .build();
    const expected = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo",
      ].join("\n"),
      [
        "Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ",
        "domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo",
      ].join("\n"),
      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo",
      ].join("\n"),
    ];
    expect(result).to.be.deep.equal(expected);
  });

  it("divides text into columns", () => {
    const person = [
      "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
      "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo",
    ].join("\n");

    const result = new TextProcessorFluentAPI(person)
      .divideIntoColumns()
      .build();
    const expected = [
      "Xuxa da Silva",
      " brasileira",
      " casada",
      " CPF 235.743.420-12",
      " residente e \ndomiciliada a Rua dos bobos",
      " zero",
      " bairro Alphaville",
      " São Paulo",
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("trims and removes line breaks", () => {
    const columns = [
      "Xuxa da Silva",
      " brasileira",
      " casada",
      " CPF 235.743.420-12",
      " residente e \ndomiciliada a Rua dos bobos",
      " zero",
      " bairro Alphaville",
      " São Paulo",
    ];

    const result = new TextProcessorFluentAPI(columns)
      .trimAndRemoveLineBreaks()
      .build();
    const expected = [
      "Xuxa da Silva",
      "brasileira",
      "casada",
      "CPF 235.743.420-12",
      "residente e domiciliada a Rua dos bobos",
      "zero",
      "bairro Alphaville",
      "São Paulo",
    ];

    expect(result).to.be.deep.equal(expected);
  });
});
