import { lstat, rm as fsRm } from "node:fs/promises";
import path from "node:path";

import { currentDir } from "../../cwd.js";
import {
  throwInvalidInputError,
  throwOperationFailedError,
} from "../../utils/error.js";

export const rm = async (pathToFile) => {
  if (pathToFile === undefined) {
    throwInvalidInputError();
  }

  const resolvedPathToFile = path.resolve(currentDir, pathToFile);

  let fileStat;
  try {
    fileStat = await lstat(resolvedPathToFile);
  } catch {
    throwOperationFailedError();
  }

  if (!fileStat.isFile()) {
    throwInvalidInputError();
  }

  try {
    await fsRm(resolvedPathToFile);
  } catch {
    throwOperationFailedError();
  }
};
