import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress } from "node:zlib";
import path from "node:path";

import store from "./../store.js";

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

export const compress = async (pathToFile, pathToDestination) => {
  const fileToCompressPath = path.resolve(currentDir, pathToFile);
  const archivePath = path.resolve(currentDir, pathToDestination);

  const brotli = createBrotliCompress();
  const r = createReadStream(fileToCompressPath);
  const w = createWriteStream(archivePath);
  try {
    await pipeline(r, brotli, w);
  } catch (error) {
    console.log(error);
    throw new Error("Invalid input");
  }
};
