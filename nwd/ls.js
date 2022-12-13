import { readdir } from "node:fs/promises";

import store from "./../store.js";

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

const sortEntriesAlphabetically = (arr) => {
  return [...arr].sort((a, b) => a.Name.localeCompare(b.Name));
};

export const ls = async () => {
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
};
