import database from "./../database.json" assert { type: "json" };
import DraftLog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";
import readline from "node:readline";
import Person from "./person.js";

DraftLog(console).addLineListener(process.stdin);

const DEFAULT_LANG = "pt-BR";
const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("ID") },
    { field: "vehicles", name: chalk.magenta("Vehicles") },
    { field: "kmTraveled", name: chalk.gray("Km Traveled") },
    { field: "from", name: chalk.red("From") },
    { field: "to", name: chalk.blue("To") },
  ],
};

const table = chalkTable(
  options,
  database.map((item) => new Person(item).formatter(DEFAULT_LANG))
);
const print = console.draft(table);

// setInterval(() => {
//   database.push({ id: Date.now(), vehicles: `Test ${Date.now()}` });
//   const newTable = chalkTable(options, database);
//   print(newTable);
// }, 1000);

// const terminal = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// terminal.question("What is your name? ", (answer) => {
//   console.log("R:", answer.toString());
// });

// const person = new Person({
//   id: 1,
//   vehicles: ["Motorcycle", "Car", "Truck"],
//   kmTraveled: 10000,
//   from: "2010-01-01",
//   to: "2020-12-31",
// });
// // console.log("🚀 ~ person", person);
// const result = person.formatter("pt-BR");
// console.log(result);
