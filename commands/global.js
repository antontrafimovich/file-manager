import process from "node:process";

import { commandsEmitter, execute } from "../emitter.js";
import { throwInvalidInputError } from "../utils/error.js";

commandsEmitter.on(".exit", (args) =>
  execute(() => {
    if (args.length > 0) {
      throwInvalidInputError();
    }

    process.exit(process.exitCode);
  })
);
