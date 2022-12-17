import { lstat } from "node:fs/promises";
import path from "node:path";

import { currentDir } from "../../cwd.js";
import store from "../../store.js";

export const cd = async (changeDirectoryTo) => {
  if (!changeDirectoryTo) {
    throw new Error("Path to new directory must be valid");
  }

  let newDir = path.resolve(currentDir, changeDirectoryTo);

  try {
    const entry = await lstat(newDir);

    if (!entry.isDirectory()) {
      throw new Error("Invalid input");
    }
  } catch (error) {
    throw new Error("Invalid input");
  }

  store.trigger({ type: "SET_WORKING_DIR", payload: newDir });
};
