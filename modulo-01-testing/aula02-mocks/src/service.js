const https = require("node:https");

class Service {
  makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        response.on("data", (data) => resolve(JSON.parse(data)));
        response.on("error", reject);
      });
    });
  }

  async getPlanets(url) {
    const json = await this.makeRequest(url);
    // console.log(json);
    return {
      name: json.name,
      surfaceWater: json.surface_water,
      appearedIn: json.films.length,
    };
  }
}

module.exports = Service;
