import "./fs/index.js";
import "./hash/index.js";
import "./nwd/index.js";
import "./os/index.js";
import "./zip/index.js";

import process from "node:process";

import { commandsEmitter, EVENTS_LIST } from "./emitter.js";
import store from "./store.js";

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

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

const showCurrentDir = (currentDir) => {
  console.log(`Current directory is ${currentDir}`);
};

commandsEmitter.on("commandEnd", () => {
  showCurrentDir(currentDir);
});

showCurrentDir(currentDir);

const parseCommand = (command) => {
  var splitRegexp = /[^\s"']+|"([^"]*)"|'([^']*)'/gi;

  let match;

  let operation;

  let argumentPart = "";
  const args = [];

  do {
    match = splitRegexp.exec(command);
    if (match === null) {
      continue;
    }

    if (match[0] && !operation) {
      operation = match[0];
      continue;
    }

    if (match[0] && !(match[1] || match[2])) {
      argumentPart = match[0];
      continue;
    }

    if ((match[1] || match[2]) && argumentPart) {
      const fullArg = `${argumentPart}${match[1] || match[2]}`;
      argumentPart = null;
      args.push(fullArg);
      continue;
    }

    if (match[1] || match[2]) {
      args.push(match[1] || match[2]);
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

  if (!EVENTS_LIST.includes(operation)) {
    console.error(`${operation} is unknown command`);
    return;
  }

  commandsEmitter.emit(operation, args);
});

process
  .on("SIGINT", () => {
    process.exit();
  })
  .on("exit", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });
