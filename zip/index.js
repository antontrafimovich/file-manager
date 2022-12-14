import { commandsEmitter } from "../emitter.js";
import { compress } from "./compress.js";
import { decompress } from "./decompress.js";

const execute = async (command) => {
  try {
    await command();
  } catch (error) {
    commandsEmitter.emit("error", error);
  }
};

commandsEmitter
  .on("compress", async ([pathToFile, pathToDestination]) => {
    execute(() => compress(pathToFile, pathToDestination));
  })
  .on("decompress", async ([pathToFile, pathToDestination]) => {
    execute(() => decompress(pathToFile, pathToDestination));
  });
