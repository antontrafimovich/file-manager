import { createReadStream, createWriteStream } from "node:fs";
import { appendFile, rename, lstat, rm as fsRm } from "node:fs/promises";
import path from "node:path";
import { stdout } from "node:process";
import { pipeline } from "node:stream/promises";
import { Transform, Writable } from "node:stream";
import { EOL } from "node:os";

import { commandsEmitter } from "./emitter.js";
import store from "./store.js";

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

commandsEmitter.on("cat", async (args) => {
  const [pathToFile] = args;

  let validPath = path.resolve(currentDir, pathToFile);

  const addEOL = new Transform({
    decodeStrings: false,
    transform(chunk, _, callback) {
      callback(null, `${chunk}${EOL}`);
    },
  });

  const writeToConsole = new Writable({
    decodeStrings: false,
    write(chunk, encoding, callback) {
      stdout.write(chunk);
      callback();
    },
  });

  try {
    await pipeline(
      createReadStream(validPath, { flags: "r" }),
      addEOL,
      writeToConsole
    );
  } catch (error) {
    console.error("Invalid input");
  }
});

commandsEmitter.on("add", async (args) => {
  const [filename] = args;

  const filePath = path.resolve(currentDir, filename);

  try {
    await appendFile(filePath, "", {
      flag: "ax",
    });
  } catch (error) {
    console.error("Invalid input");
  }
});

commandsEmitter.on("rn", async (args) => {
  const [pathToFile, newFilename] = args;

  const originalFilePath = path.resolve(currentDir, pathToFile);
  const originalFileDirname = path.dirname(originalFilePath);

  const newFilePath = path.resolve(originalFileDirname, newFilename);

  try {
    await rename(originalFilePath, newFilePath);
  } catch (error) {
    console.error("Invalid input");
  }
});

const copy = async (args) => {
  const [pathToFile, pathToDirectory] = args;

  const fileToCopyPath = path.resolve(currentDir, pathToFile);

  try {
    const fileStat = await lstat(fileToCopyPath);
    if (!fileStat.isFile()) {
      throw new Error("The path is not a file");
    }
  } catch (err) {
    console.log("Invalid input");
    return;
  }

  const resolvedPathToDirectory = path.resolve(currentDir, pathToDirectory);

  try {
    const fileStat = await lstat(resolvedPathToDirectory);
    if (!fileStat.isDirectory()) {
      throw new Error("The path is not a directory");
    }
  } catch (err) {
    console.log("Invalid input");
    return;
  }

  const fileToCopyName = path.basename(fileToCopyPath);

  const fileToPastePath = path.resolve(resolvedPathToDirectory, fileToCopyName);

  try {
    await pipeline(
      createReadStream(fileToCopyPath),
      createWriteStream(fileToPastePath)
    );
  } catch (error) {
    console.error("Invalid input");
  }
};

commandsEmitter.on("cp", copy);

const rm = async (args) => {
  const [pathToFile] = args;

  const resolvedPathToFile = path.resolve(currentDir, pathToFile);

  try {
    const fileStat = await lstat(resolvedPathToFile);
    if (!fileStat.isFile()) {
      throw new Error("The path is not a file");
    }
  } catch (err) {
    console.log("Invalid input");
    return;
  }

  try {
    await fsRm(resolvedPathToFile);
  } catch (error) {
    console.error("Invalid input");
  }
};

commandsEmitter.on("rm", rm);

commandsEmitter.on("mv", async (args) => {
  try {
    await copy(args);
    await rm(args);
  } catch (err) {
    console.log("Invalid input");
    return;
  }
});
