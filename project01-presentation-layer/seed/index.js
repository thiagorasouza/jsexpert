const faker = require("faker");
const Car = require("../models/entities/car");
const CarCategory = require("../models/entities/carCategory");
const Customer = require("../models/entities/customer");

const { join } = require("path");
const { writeFile } = require("node:fs/promises");

const baseFolder = join(__dirname, "../", "database");
// console.log(baseFolder);

// console.log(CarCategory);
const category = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const cars = [];
const CARS_QUANTITY = 3;
for (let i = 0; i < CARS_QUANTITY; i++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    releaseYear: faker.date.past(10).getFullYear(),
    available: true,
    gasAvailable: true,
  });
  cars.push(car);
  category.carIds.push(car.id);
}

const customers = [];
const CUSTOMERS_QUANTITY = 3;
for (let i = 0; i < CUSTOMERS_QUANTITY; i++) {
  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({ min: 18, max: 50 }),
  });
  customers.push(customer);
}

const write = (filename, data) =>
  writeFile(join(baseFolder, filename), JSON.stringify(data));

(async () => {
  write("cars.json", cars);
  write("carCategories.json", [category]);
  write("customers.json", customers);
})();
