const { describe, it } = require("mocha");
const BaseRepository = require("../../src/repositories/baseRepository");
const { join } = require("node:path");
const { expect } = require("chai");

const mockCars = require("../mocks/cars.json");
const mockCarsPath = join(__dirname, "..", "mocks", "cars.json");

describe("BaseRepository Test Suite", () => {
  describe("find()", () => {
    it("should return the entire file content if no ID is provided", async () => {
      const baseRepository = new BaseRepository({ filePath: mockCarsPath });
      const result = await baseRepository.find();
      const expected = mockCars;

      expect(result).to.be.deep.equal(expected);
    });

    it("should return the specific object if ID is provided", async () => {
      const baseRepository = new BaseRepository({ filePath: mockCarsPath });
      const id = mockCars[0].id;
      const result = await baseRepository.find(id);
      const expected = mockCars[0];

      expect(result).to.be.deep.equal(expected);
    });
  });
});
