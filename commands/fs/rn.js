import { rename, lstat } from "node:fs/promises";
import path from "node:path";

import {
  throwInvalidInputError,
  throwOperationFailedError,
} from "../../utils/error.js";
import { currentDir } from "./../../cwd.js";

export const rn = async (pathToFile, newFilename) => {
  if (!pathToFile || !newFilename) {
    throw throwInvalidInputError();
  }

  const originalFilePath = path.resolve(currentDir, pathToFile);
  const originalFileDirname = path.dirname(originalFilePath);

  const newFilePath = path.resolve(originalFileDirname, newFilename);

  try {
    const entry = await lstat(originalFilePath);

    if (!entry.isFile()) {
      throwOperationFailedError();
    }

    await rename(originalFilePath, newFilePath);
  } catch (error) {
    throwOperationFailedError();
  }
};
