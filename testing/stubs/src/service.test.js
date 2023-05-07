const Service = require("./service");
const assert = require("node:assert");
const sinon = require("sinon").createSandbox();
const mocks = {
  "tatooine": require("../mocks/tatooine.json"),
  "aldeeran": require("../mocks/aldeeran.json")
}

const BASE_URL = "http://swapi.dev/api/planets";

(async() => {
  const service = new Service();    
  const stub = sinon.stub(service, service.makeRequest.name);
  stub.withArgs(`${BASE_URL}/1`).resolves(mocks.tatooine);
  stub.withArgs(`${BASE_URL}/2`).resolves(mocks.aldeeran);

  {    
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearsIn: 5
    }
    const result = await service.getPlanet(`${BASE_URL}/1`);
    assert.deepStrictEqual(result, expected)
  }

  {    
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearsIn: 2
    }
    const result = await service.getPlanet(`${BASE_URL}/2`);
    assert.deepStrictEqual(result, expected)
  }
})();