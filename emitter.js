import { EventEmitter } from "node:events";

export const EVENTS_LIST = [
  "up",
  "cd",
  "ls",
  "cat",
  "add",
  "rn",
  "cp",
  "rm",
  "mv",
  "os",
];

export const commandsEmitter = new EventEmitter().on("error", (error) =>
  console.log(error.message)
);
