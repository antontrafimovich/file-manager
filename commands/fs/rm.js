import { lstat, rm as fsRm } from "node:fs/promises";
import path from "node:path";

import store from "../../store.js";

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

export const rm = async (pathToFile) => {
  const resolvedPathToFile = path.resolve(currentDir, pathToFile);

  try {
    const fileStat = await lstat(resolvedPathToFile);
    if (!fileStat.isFile()) {
      throw new Error("The path is not a file");
    }
  } catch (err) {
    throw new Error("Invalid input");
  }

  try {
    await fsRm(resolvedPathToFile);
  } catch (error) {
    throw new Error("Invalid input");
  }
};
