import { appendFile } from "node:fs/promises";
import path from "node:path";

import store from "../store.js";

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

export const add = async (fileName) => {
  const filePath = path.resolve(currentDir, fileName);

  try {
    await appendFile(filePath, "", {
      flag: "ax",
    });
  } catch (error) {
    throw new Error("Invalid input");
  }
};
