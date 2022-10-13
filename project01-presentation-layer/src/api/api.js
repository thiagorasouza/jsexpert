const http = require("node:http");
const { join } = require("node:path");

const CarService = require("../service/carService");
const CategoryService = require("../service/categoryService");
const categoryDatabaseFilePath = join(
  __dirname,
  "..",
  "..",
  "database",
  "carCategories.json"
);
const carsDatabaseFilePath = join(
  __dirname,
  "..",
  "..",
  "database",
  "cars.json"
);

const routes = new Map();
const categoryService = new CategoryService({ categoryDatabaseFilePath });
const carService = new CarService({ carsDatabaseFilePath });

const getCarFromCategoryRegex =
  /^GET:\/category\/(?<categoryId>[a-z0-9-]+)\/car\/?$/i;
routes.set(getCarFromCategoryRegex, async (req, res) => {
  const { categoryId } = req.params;
  const carCategory = await categoryService.getCategoryById(categoryId);
  const car = await carService.getAvailableCar(carCategory);
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  return res.end(JSON.stringify(car));
});

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  const routeKey = `${method}:${url}`;
  for (const [routeKeyRegex, routeHandler] of routes) {
    const matches = routeKey.match(routeKeyRegex);
    if (matches) {
      const reqWithParams = Object.create(req);
      reqWithParams.params = matches.groups;
      return await routeHandler(reqWithParams, res);
    } else {
      // console.log("Default route");
      res.statusCode = 404;
      return res.end("Not found");
    }
  }
});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});

module.exports = { server, carService, categoryService };
