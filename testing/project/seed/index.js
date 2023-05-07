const { writeFile } = require("node:fs/promises");
const { join } = require("node:path");

const { faker } = require("@faker-js/faker");

const Car = require("../src/entities/car");
const CarCategory = require("../src/entities/carCategory");
const Customer = require("../src/entities/customer");

const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const makeCar = () =>
  new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    releaseYear: faker.date.past(20).getFullYear(),
    available: true,
    gasAvailable: true,
  });

const makeCustomer = () =>
  new Customer({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    age: faker.datatype.number({
      min: 20,
      max: 50,
    }),
  });

const cars = [];
const customers = [];
for (let i = 1; i <= 3; i++) {
  const car = makeCar();
  cars.push(car);
  carCategory.carIds.push(car.id);

  const customer = makeCustomer();
  customers.push(customer);
}

const BASE_PATH = join(__dirname, "..", "database");

const write = (filename, data) =>
  writeFile(join(BASE_PATH, filename), JSON.stringify(data));

(async () => {
  await write("carCategories.json", [carCategory]);
  await write("cars.json", cars);
  await write("customers.json", customers);
  console.log("Seeding database completed.");
})();
