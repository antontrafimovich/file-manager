import { lstat } from "node:fs/promises";
import path from "node:path";

import { currentDir } from "../../cwd.js";
import store from "../../store.js";
import {
  throwInvalidInputError,
  throwOperationFailedError,
} from "../../utils/error.js";

export const cd = async (changeDirectoryTo = "") => {
  const newDir = path.resolve(currentDir, changeDirectoryTo);

  let entry;
  try {
    entry = await lstat(newDir);
  } catch {
    throwOperationFailedError();
  }

  if (!entry.isDirectory()) {
    throwInvalidInputError();
  }

  store.trigger({ type: "SET_WORKING_DIR", payload: newDir });
};
