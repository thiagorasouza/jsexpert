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
    // console.log("result", result);
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
    const content = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo",
      ].join("\n"),
    ];

    const result = new TextProcessorFluentAPI(content)
      .divideIntoColumns()
      .build();
    // console.log(result);
    const expected = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo",
      ],
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("trims and removes line breaks", () => {
    const content = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo",
      ],
    ];

    const result = new TextProcessorFluentAPI(content)
      .trimAndRemoveLineBreaks()
      .build();
    const expected = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo",
      ],
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("maps to person", () => {
    const content = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo",
      ],
    ];

    const result = new TextProcessorFluentAPI(content).mapPerson().build();

    const expected = [
      {
        name: "Xuxa da Silva",
        nationality: "Brasileira",
        maritalStatus: "Casada",
        idNumber: "23574342012",
        street: "Rua dos bobos",
        buildingNumber: "zero",
        neighborhood: "Alphaville",
        city: "São Paulo",
      },
    ];

    expect(result).to.be.deep.equal(expected);
  });
});
