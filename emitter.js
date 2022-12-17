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
  "hash",
  "compress",
  "decompress",
  ".exit",
];

export const execute = async (command) => {
  try {
    await command();
  } catch (error) {
    commandsEmitter.emit("error", error);
  } finally {
    commandsEmitter.emit("commandEnd");
  }
};

export const commandsEmitter = new EventEmitter().on(
  "error",
  (error) => console.log(error.message)
);
