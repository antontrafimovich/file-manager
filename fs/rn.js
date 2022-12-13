import { rename } from "node:fs/promises";
import path from "node:path";

import store from "../store.js";

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

export const rn = async (pathToFile, newFilename) => {
  if (!pathToFile || !newFilename) {
    throw new Error("Invalid input");
  }

  const originalFilePath = path.resolve(currentDir, pathToFile);
  const originalFileDirname = path.dirname(originalFilePath);

  const newFilePath = path.resolve(originalFileDirname, newFilename);

  try {
    await rename(originalFilePath, newFilePath);
  } catch (error) {
    throw new Error("Invalid input");
  }
};
