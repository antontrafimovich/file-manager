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
