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

const sortEntriesAlphabetically = (arr) => {
  return [...arr].sort((a, b) => a.Name.localeCompare(b.Name));
};
commandsEmitter.on("ls", async () => {
  try {
    const directoryEntries = await readdir(currentDir, { withFileTypes: true });
    const { directories, files } = directoryEntries.reduce(
      (result, entry) => {
        if (entry.isFile()) {
          const file = {
            Name: entry.name,
            Type: "file",
          };

          return {
            files: [...result.files, file],
            directories: result.directories,
          };
        }

        const directory = {
          Name: entry.name,
          Type: "directory",
        };

        return {
          files: result.files,
          directories: [...result.directories, directory],
        };
      },
      { directories: [], files: [] }
    );

    const result = [
      ...sortEntriesAlphabetically(directories),
      ...sortEntriesAlphabetically(files),
    ];

    console.table(result);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
  }
});
