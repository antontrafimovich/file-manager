import { commandsEmitter } from "../emitter.js";
import { hash } from "./hash.js";

const execute = async (command) => {
  try {
    await command();
  } catch (error) {
    commandsEmitter.emit("error", error);
  }
};

commandsEmitter.on("hash", ([pathToFile]) => execute(() => hash(pathToFile)));
