import { readFile } from "fs/promises";
import crypto from "node:crypto";
import path from "node:path";

import store from "./../../store.js";

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

export const hash = async (pathToFile) => {
  if (!pathToFile) {
    throw new Error("Invalid input");
  }

  const resolvedPathToFile = path.resolve(currentDir, pathToFile);

  try {
    const content = await readFile(resolvedPathToFile, { encoding: "utf-8" });
    const hash = crypto
      .createHash("sha256")
      .update(content, "utf-8")
      .digest("hex");

    console.log(hash);
  } catch (err) {
    throw new Error("Invalid input");
  }
};
