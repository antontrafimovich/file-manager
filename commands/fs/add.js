import { appendFile } from "node:fs/promises";
import path from "node:path";

import { currentDir } from "../../cwd.js";
import {
  throwInvalidInputError,
  throwOperationFailedError,
} from "../../utils/error.js";

export const add = async (fileName) => {
  if (!fileName) {
    throwInvalidInputError();
  }

  const filePath = path.resolve(currentDir, fileName);

  try {
    await appendFile(filePath, "", {
      flag: "ax",
    });
  } catch {
    throwOperationFailedError();
  }
};
