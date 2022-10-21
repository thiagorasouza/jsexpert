import { expect } from "chai";
import { describe, it } from "mocha";
import Person from "../src/person.js";

describe("Person Test Suite", () => {
  it("should return an instance from a string", () => {
    const person = Person.getInstanceFromString(
      "2 Bike,Skate 1000 2022-01-01 2022-03-01"
    );
    const expected = {
      id: "2",
      vehicles: ["Bike", "Skate"],
      kmTraveled: "1000",
      from: "2022-01-01",
      to: "2022-03-01",
    };

    expect(person).to.be.deep.equal(expected);
  });

  it("should return a formatted entry", () => {
    const person = new Person({
      id: "2",
      vehicles: ["Bike", "Skate"],
      kmTraveled: "1000",
      from: "2022-01-01",
      to: "2022-03-01",
    });
    const result = person.formatter("pt-BR");
    // console.log("🚀 ~ result", result);
    const expected = {
      id: 2,
      vehicles: "Bike e Skate",
      kmTraveled: "1.000 km",
      from: "01 de janeiro de 2022",
      to: "01 de março de 2022",
    };

    expect(result).to.be.deep.equal(expected);
  });
});
