import path from "node:path";

import store from "./../store.js";

let currentDir = "";

store.onUpdate((state) => {
  currentDir = state.workingDirectory;
});

export const up = () => {
  store.trigger({ type: "SET_WORKING_DIR", payload: path.dirname(currentDir) });
};
