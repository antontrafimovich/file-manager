import { createReadStream, createWriteStream } from "node:fs";
import { lstat } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress } from "node:zlib";

import {
  throwInvalidInputError,
  throwOperationFailedError,
} from "../../utils/error.js";
import { currentDir } from "./../../cwd.js";

export const compress = async (pathToFile, pathToDestination) => {
  if (!pathToFile || !pathToDestination) {
    throwInvalidInputError();
  }

  const fileToCompressPath = path.resolve(currentDir, pathToFile);

  let fileToCompressStat;

  try {
    fileToCompressStat = await lstat(fileToCompressPath);
  } catch {
    throwOperationFailedError();
  }

  if (!fileToCompressStat.isFile()) {
    throwInvalidInputError();
  }

  const archivePath = path.resolve(currentDir, pathToDestination);

  let archivePathStat;

  try {
    archivePathStat = await lstat(archivePath);
  } catch {}

  if (archivePathStat !== undefined) {
    throwOperationFailedError();
  }

  const brotli = createBrotliCompress();
  const r = createReadStream(fileToCompressPath);
  const w = createWriteStream(archivePath);

  try {
    await pipeline(r, brotli, w);
  } catch {
    throwOperationFailedError();
  }
};
