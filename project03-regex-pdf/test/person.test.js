const { describe, it } = require("mocha");
const { expect } = require("chai");
const Person = require("../src/person");

describe("Person Test Suite", () => {
  it("should return a person object", () => {
    const data = [
      "xuxa da silva",
      "brasileira",
      "casada",
      "CPF 235.743.420-12",
      "residente e domiciliada a Rua dos bobos",
      "zero",
      "bairro Alphaville",
      "São Paulo",
    ];
    const result = new Person(data);
    const expected = {
      name: "Xuxa da Silva",
      nationality: "Brasileira",
      maritalStatus: "Casada",
      idNumber: "23574342012",
      street: "Rua dos bobos",
      buildingNumber: "zero",
      neighborhood: "Alphaville",
      city: "São Paulo",
    };

    expect(result).to.be.deep.equal(expected);
  });
});
