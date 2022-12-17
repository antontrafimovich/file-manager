import "./commands/index.js";

import { currentDir } from "./cwd.js";
import { commandsEmitter, EVENTS_LIST, execute } from "./emitter.js";
import { getArgumentByKey } from "./utils/arguments.js";
import { parseCommandString } from "./utils/command.js";

const showCurrentDir = (currentDir) => {
  console.log(`Current directory is ${currentDir}`);
};

commandsEmitter.on("commandEnd", () => {
  showCurrentDir(currentDir);
});

const username = getArgumentByKey("--username") ?? "anton";
console.log(`Welcome to the File Manager, ${username}!`);

showCurrentDir(currentDir);

process.stdin.setEncoding("utf8").on("data", (command) => {
  const { operation, args } = parseCommandString(command.trim());

  if (EVENTS_LIST.includes(operation)) {
    return commandsEmitter.emit(operation, args);
  }

  if (!operation) {
    return commandsEmitter.emit("commandEnd");
  }

  commandsEmitter.emit("error", new Error("Invalid input"));

  commandsEmitter.emit("commandEnd");
});

process
  .on("SIGINT", () => {
    process.exit();
  })
  .on("exit", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });
