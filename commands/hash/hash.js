import { lstat, readFile } from "fs/promises";
import crypto from "node:crypto";
import path from "node:path";

import { currentDir } from "../../cwd.js";
import {
  throwInvalidInputError,
  throwOperationFailedError,
} from "../../utils/error.js";

export const hash = async (pathToFile) => {
  if (!pathToFile) {
    throw throwInvalidInputError();
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
    const content = await readFile(resolvedPathToFile, { encoding: "utf-8" });
    const hash = crypto
      .createHash("sha256")
      .update(content, "utf-8")
      .digest("hex");

    console.log(hash);
  } catch {
    throwOperationFailedError();
  }
};
