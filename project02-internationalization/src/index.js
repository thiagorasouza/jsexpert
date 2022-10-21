import database from "./../database.json" assert { type: "json" };
import Person from "./person.js";
import TerminalController from "./terminalController.js";
import { save } from "./repository.js";

const DEFAULT_LANG = "pt-BR";
const STOP_TERM = ":q";

const controller = new TerminalController();
controller.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await controller.question("What? ");
    if (answer === STOP_TERM) {
      controller.closeTerminal();
    }
    const person = Person.getInstanceFromString(answer);
    controller.updateTerminal(person.formatter(DEFAULT_LANG));
    await save(person);
    return mainLoop();
  } catch (error) {
    console.log(error);
    return mainLoop();
  }
}

await mainLoop();
