import { commandsEmitter } from "../emitter.js";
import { os } from "./os.js";

const execute = async (command) => {
  try {
    await command();
  } catch (error) {
    commandsEmitter.emit("error", error);
  }
};

commandsEmitter.on("os", ([option]) => execute(() => os(option)));