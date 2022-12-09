// import { EventEmitter } from "node:events";
import "./nwd.js";
import "./fs.js";

import { commandsEmitter, EVENTS_LIST } from "./emitter.js";
import store from "./store.js";
import process from "node:process";

const getUserNameFromArgs = (args) => {
  const usernameParam = args.find((arg) => arg.startsWith("--username"));

  if (!usernameParam) {
    return "anton";
  }

  const [_, name] = usernameParam.split("=");

  return name;
};

const startArguments = process.argv.slice(2);

const username = getUserNameFromArgs(startArguments);

console.log(`Welcome to the File Manager, ${username}!`);

store.onUpdate((state) => {
  console.log(`Current directory is ${state.workingDirectory}`);
});

process.stdin.setEncoding("utf8").on("data", (command) => {
  const [operation, ...other] = command.trim().split(" ");

  if (!EVENTS_LIST.includes(operation)) {
    console.error(`${operation} is unknown command`);
    return;
  }

  commandsEmitter.emit(operation, other);
});

process.on("SIGINT", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
});
