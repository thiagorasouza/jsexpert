import DraftLog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";
import Person from "./person.js";
import readline from "node:readline";
import { stdin, stdout } from "node:process";

export default class TerminalController {
  constructor() {
    this.print = {};
    this.data = {};
    this.terminal = {};
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(stdin);
    this.initializeTable(database, language);

    this.terminal = readline.createInterface({
      input: stdin,
      output: stdout,
    });
  }

  initializeTable(database, language) {
    const data = database.map((item) => new Person(item).formatter(language));
    const table = chalkTable(this.getTableOptions(), data);

    this.print = console.draft(table);
    this.data = data;
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "kmTraveled", name: chalk.gray("Km Traveled") },
        { field: "from", name: chalk.red("From") },
        { field: "to", name: chalk.blue("To") },
      ],
    };
  }

  question(msg = "") {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  closeTerminal() {
    this.terminal.close();
    console.log("Process finished");
  }
}
