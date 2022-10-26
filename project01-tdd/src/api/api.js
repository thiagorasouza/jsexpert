const http = require("node:http");
const { join } = require("node:path");
const CarService = require("../service/carService");
const CategoryService = require("../service/categoryService");
const CustomerService = require("../service/customerService");

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
const customersDatabaseFilePath = join(
  __dirname,
  "..",
  "..",
  "database",
  "customers.json"
);

const categoryService = new CategoryService({ categoryDatabaseFilePath });
const carService = new CarService({ carsDatabaseFilePath });
const customerService = new CustomerService({ customersDatabaseFilePath });

const routes = new Map();

const getCarFromCategoryRegex =
  /^GET:\/category\/(?<categoryId>[a-z0-9-]+)\/car\/?$/i;

const getFinalPriceRegex =
  /^GET:\/deal\/(?<categoryId>[a-z0-9-]+)\/(?<customerId>[a-z0-9-]+)\/(?<numberOfDays>[0-9]+)\/?$/i;

routes.set(getCarFromCategoryRegex, async (req, res) => {
  const { categoryId } = req.params;

  const carCategory = await categoryService.getCategoryById(categoryId);
  const car = await carService.getAvailableCar(carCategory);

  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  return res.end(JSON.stringify(car));
});

routes.set(getFinalPriceRegex, async (req, res) => {
  const { categoryId, customerId, numberOfDays } = req.params;
  const carCategory = await categoryService.getCategoryById(categoryId);
  const customer = await customerService.getCustomerById(customerId);

  const finalPrice = carService.calculateFinalPrice(
    carCategory,
    customer,
    numberOfDays
  );

  await res.writeHead(200, {
    "Content-Type": "application/json",
  });
  return res.end(JSON.stringify(finalPrice));
});

routes.set("/order", async (req, res) => {
  const body = await new Promise((resolve) => {
    req.on("data", (data) => resolve(JSON.parse(data)));
  });
  const { carCategory, customer, numberOfDays } = body;

  const transaction = await carService.rent(
    carCategory,
    customer,
    numberOfDays
  );

  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(transaction));
});

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  const routeKey = `${method}:${url}`;

  for (const [routeKeyRegex, routeHandler] of routes) {
    // console.log("🚀 ~ routeKey", routeKey);
    // console.log("🚀 ~ routeKeyRegex", routeKeyRegex);
    const matches = routeKey.match(routeKeyRegex);
    // console.log("🚀 ~ matches", matches);
    if (matches) {
      const reqWithParams = Object.create(req);
      reqWithParams.params = matches.groups;
      return await routeHandler(reqWithParams, res);
    }
  }

  res.statusCode = 404;
  return res.end("Not found");
});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});

module.exports = { server, carService, categoryService, customerService };
