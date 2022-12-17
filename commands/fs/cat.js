import { createReadStream } from "node:fs";
import { EOL } from "node:os";
import path from "node:path";
import { stdout } from "node:process";
import { Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

import store from "./../../store.js";

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

export const cat = async (pathToFile) => {
  let validPath = path.resolve(currentDir, pathToFile);

  const addEOL = new Transform({
    decodeStrings: false,
    transform(chunk, _, callback) {
      callback(null, `${chunk}${EOL}`);
    },
  });

  const writeToConsole = new Writable({
    decodeStrings: false,
    write(chunk, _, callback) {
      stdout.write(chunk);
      callback();
    },
  });

  try {
    await pipeline(
      createReadStream(validPath, { flags: "r" }),
      addEOL,
      writeToConsole
    );
  } catch (error) {
    throw new Error("Invalid input");
  }
};
