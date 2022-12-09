import { createReadStream } from "node:fs";
import { appendFile } from "node:fs/promises";
import path from "node:path";
import { stdout } from "node:process";
import { pipeline } from "node:stream/promises";
import { Transform } from "node:stream";

import { commandsEmitter } from "./emitter.js";
import store from "./store.js";

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

commandsEmitter.on("cat", async (args) => {
  const [pathToFile] = args;

  let validPath = path.resolve(currentDir, pathToFile);

  try {
    await pipeline(
      createReadStream(validPath, { flags: "r" }),
      new Transform({
        decodeStrings: false,
        transform: (chunk, _, callback) => {
          callback(null, `${chunk}\n`);
        },
      }),
      stdout
    );
  } catch (error) {
    console.error("Invalid input");
  }
});

commandsEmitter.on("add", async (args) => {
  const [filename] = args;

  let filePath = path.resolve(currentDir, filename);

  try {
    await appendFile(filePath, "", {
      flag: "ax",
    });
  } catch (error) {
    console.error("Invalid input");
  }
});
