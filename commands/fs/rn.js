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

  let entry;

  try {
    entry = await lstat(originalFilePath);
  } catch {
    throwOperationFailedError();
  }

  if (!entry.isFile()) {
    throwInvalidInputError();
  }

  const originalFileDirname = path.dirname(originalFilePath);

  const newFilePath = path.resolve(originalFileDirname, newFilename);
  const newFileDirname = path.dirname(newFilePath);

  if (originalFileDirname !== newFileDirname) {
    throwInvalidInputError();
  }

  try {
    await rename(originalFilePath, newFilePath);
  } catch (error) {
    throwOperationFailedError();
  }
};
