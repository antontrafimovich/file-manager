import { lstat } from "node:fs/promises";
import path from "node:path";

import { currentDir } from "../../cwd.js";
import store from "../../store.js";
import { throwOperationFailedError } from "../../utils/error.js";

export const cd = async (changeDirectoryTo = "") => {
  const newDir = path.resolve(currentDir, changeDirectoryTo);

  try {
    const entry = await lstat(newDir);

    if (!entry.isDirectory()) {
      throwOperationFailedError();
    }
  } catch {
    throwOperationFailedError();
  }

  store.trigger({ type: "SET_WORKING_DIR", payload: newDir });
};
