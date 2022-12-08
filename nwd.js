import { commandsEmitter } from "./emitter.js";
import store from "./store.js";
import path from "node:path";

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

commandsEmitter.on("up", () => {
  store.trigger({ type: "SET_WORKING_DIR", payload: path.dirname(currentDir) });
});

commandsEmitter.on("cd", (args) => {
  const [changeDirectoryTo] = args;

  if (path.isAbsolute(changeDirectoryTo)) {
    store.trigger({ type: "SET_WORKING_DIR", payload: changeDirectoryTo });
  } else {
    const newDir = path.resolve(currentDir, changeDirectoryTo);
    store.trigger({ type: "SET_WORKING_DIR", payload: newDir });
  }
});
