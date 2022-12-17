import path from "node:path";

import { currentDir } from "../cwd.js";
import store from "./../store.js";

export const up = () => {
  store.trigger({ type: "SET_WORKING_DIR", payload: path.dirname(currentDir) });
};
