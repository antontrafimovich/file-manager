import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";
import path from "node:path";

import store from "./../../store.js";

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

export const decompress = async (pathToFile, pathToDestination) => {
  const archivePath = path.resolve(currentDir, pathToFile);
  const decompressedFilePath = path.resolve(currentDir, pathToDestination);

  const brotli = createBrotliDecompress();
  const r = createReadStream(archivePath);
  const w = createWriteStream(decompressedFilePath);
  try {
    await pipeline(r, brotli, w);
  } catch (error) {
    throw new Error("Invalid input");
  }
};
