import { createReadStream } from "node:fs";
import { EOL } from "node:os";
import path from "node:path";
import { stdout } from "node:process";
import { Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

import {
  throwInvalidInputError,
  throwOperationFailedError,
} from "../../utils/error.js";
import { currentDir } from "./../../cwd.js";

export const cat = async (pathToFile) => {
  if (!pathToFile) {
    throwInvalidInputError();
  }

  const validPath = path.resolve(currentDir, pathToFile);

  const addEOL = new Transform({
    decodeStrings: false,
    transform(chunk, _, callback) {
      callback(null, chunk);
    },
    flush(callback) {
      callback(null, EOL);
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
  } catch {
    throwOperationFailedError();
  }
};
