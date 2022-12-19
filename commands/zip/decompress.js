import { createReadStream, createWriteStream } from "node:fs";
import { lstat } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";

import { currentDir } from "../../cwd.js";
import {
  throwInvalidInputError,
  throwOperationFailedError,
} from "../../utils/error.js";

export const decompress = async (pathToFile, pathToDestination) => {
  if (!pathToFile || !pathToDestination) {
    throwInvalidInputError();
  }

  const archivePath = path.resolve(currentDir, pathToFile);

  let archivePathStat;
  try {
    archivePathStat = await lstat(archivePath);
  } catch {
    throwOperationFailedError();
  }

  if (!archivePathStat.isFile()) {
    throwInvalidInputError();
  }

  const decompressedFilePath = path.resolve(currentDir, pathToDestination);

  let decompressedFileStat;
  try {
    decompressedFileStat = await lstat(decompressedFilePath);
  } catch {}

  if (decompressedFileStat && decompressedFileStat.isDirectory()) {
    throwInvalidInputError();
  }

  if (decompressedFileStat) {
    throwOperationFailedError();
  }

  const brotli = createBrotliDecompress();
  const r = createReadStream(archivePath);
  const w = createWriteStream(decompressedFilePath);
  try {
    await pipeline(r, brotli, w);
  } catch {
    throwOperationFailedError();
  }
};
