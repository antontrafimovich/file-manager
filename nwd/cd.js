import { access, constants } from "node:fs/promises";
import path from "node:path";

import store from "./../store.js";

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

export const cd = async (changeDirectoryTo) => {
  let newDir = changeDirectoryTo;
  if (!path.isAbsolute(changeDirectoryTo)) {
    newDir = path.resolve(currentDir, changeDirectoryTo);
  }

  try {
    await access(newDir, constants.F_OK);
  } catch (error) {
    throw new Error("Invalid input");
  }

  store.trigger({ type: "SET_WORKING_DIR", payload: newDir });
};
