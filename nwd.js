import { commandsEmitter } from "./emitter.js";
import { access, readdir, constants } from "node:fs/promises";
import store from "./store.js";
import path from "node:path";

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

commandsEmitter.on("up", () => {
  store.trigger({ type: "SET_WORKING_DIR", payload: path.dirname(currentDir) });
});

commandsEmitter.on("cd", async (args) => {
  const [changeDirectoryTo] = args;

  let newDir = changeDirectoryTo;
  if (!path.isAbsolute(changeDirectoryTo)) {
    newDir = path.resolve(currentDir, changeDirectoryTo);
  }

  try {
    await access(newDir, constants.F_OK);
  } catch (error) {
    console.error("Invalid input");
    return;
  }

  store.trigger({ type: "SET_WORKING_DIR", payload: newDir });
});

commandsEmitter.on("ls", async () => {
  try {
    const files = await readdir(currentDir, { withFileTypes: true });
    const filesToDisplay = files.map((file) => {
      return {
        Name: file.name,
        Type: file.isFile() ? "file" : "directory",
      };
    });

    console.table(filesToDisplay);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
  }
});
