import { createReadStream, createWriteStream } from "node:fs";
import { lstat } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";

import {
  throwInvalidInputError,
  throwOperationFailedError,
} from "../../utils/error.js";
import { currentDir } from "./../../cwd.js";

export const cp = async (pathToFile, pathToDirectory) => {
  if (pathToFile === undefined || pathToDirectory === undefined) {
    throwInvalidInputError();
  }

  const fileToCopyPath = path.resolve(currentDir, pathToFile);

  let fileStat;
  try {
    fileStat = await lstat(fileToCopyPath);
  } catch {
    throw throwOperationFailedError();
  }

  if (!fileStat.isFile()) {
    throwInvalidInputError();
  }

  const resolvedPathToDirectory = path.resolve(currentDir, pathToDirectory);

  let pathToDirectoryStat;
  try {
    pathToDirectoryStat = await lstat(resolvedPathToDirectory);
  } catch {
    throwOperationFailedError();
  }

  if (!pathToDirectoryStat.isDirectory()) {
    throwInvalidInputError();
  }

  const fileToCopyName = path.basename(fileToCopyPath);

  const fileToPastePath = path.resolve(resolvedPathToDirectory, fileToCopyName);

  let pathToPasteStat;

  try {
    pathToPasteStat = await lstat(fileToPastePath);
  } catch {}

  if (pathToPasteStat !== undefined) {
    throwOperationFailedError();
  }

  try {
    await pipeline(
      createReadStream(fileToCopyPath),
      createWriteStream(fileToPastePath)
    );
  } catch (error) {
    throw throwOperationFailedError();
  }
};
