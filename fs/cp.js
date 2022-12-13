import { createReadStream, createWriteStream } from "node:fs";
import { lstat } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";

import store from "../store.js";

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

export const cp = async (pathToFile, pathToDirectory) => {
  const fileToCopyPath = path.resolve(currentDir, pathToFile);

  try {
    const fileStat = await lstat(fileToCopyPath);
    if (!fileStat.isFile()) {
      throw new Error("The path is not a file");
    }
  } catch (err) {
    throw new Error("Invalid input");
  }

  const resolvedPathToDirectory = path.resolve(currentDir, pathToDirectory);

  try {
    const fileStat = await lstat(resolvedPathToDirectory);
    if (!fileStat.isDirectory()) {
      throw new Error("The path is not a directory");
    }
  } catch (err) {
    throw new Error("Invalid input");
  }

  const fileToCopyName = path.basename(fileToCopyPath);

  const fileToPastePath = path.resolve(resolvedPathToDirectory, fileToCopyName);

  try {
    await pipeline(
      createReadStream(fileToCopyPath),
      createWriteStream(fileToPastePath)
    );
  } catch (error) {
    throw new Error("Invalid input");
  }
};
