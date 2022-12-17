import "./fs/index.js";
import "./hash/index.js";
import "./nwd/index.js";
import "./os/index.js";
import "./zip/index.js";

import { getArgumentByKey } from "./utils/arguments.js";

import { commandsEmitter, EVENTS_LIST } from "./emitter.js";
import { currentDir } from "./cwd.js";

const username = getArgumentByKey("--username") ?? "anton";

const showCurrentDir = (currentDir) => {
  console.log(`Current directory is ${currentDir}`);
};

commandsEmitter.on("commandEnd", () => {
  showCurrentDir(currentDir);
});

console.log(`Welcome to the File Manager, ${username}!`);

showCurrentDir(currentDir);

const parseCommand = (command) => {
  const splitRegexp = /[^\s"']+|"([^"]*)"|'([^']*)'/gi;

  let operation;
  const args = [];

  let match;
  do {
    match = splitRegexp.exec(command);

    if (match === null) {
      continue;
    }

    const matchedOperation = match[0] ?? match[1] ?? match[2];

    if (matchedOperation && !operation) {
      operation = matchedOperation;
      continue;
    }

    const matchedArg = match[1] ?? match[2] ?? match[0];

    if (matchedArg) {
      args.push(matchedArg);
    }
  } while (match != null);

  return {
    operation,
    args,
  };
};

process.stdin.setEncoding("utf8").on("data", (command) => {
  const { operation, args } = parseCommand(command.trim());

  if (operation === ".exit") {
    process.exit(process.exitCode);
  }

  if (EVENTS_LIST.includes(operation)) {
    return commandsEmitter.emit(operation, args);
  }

  if (!operation) {
    return commandsEmitter.emit("commandEnd");
  }

  console.error(`${operation} is unknown command`);
  commandsEmitter.emit("commandEnd");
});

process
  .on("SIGINT", () => {
    process.exit();
  })
  .on("exit", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });
