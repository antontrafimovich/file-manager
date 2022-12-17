import process from "node:process";

import { commandsEmitter, execute } from "../emitter.js";

commandsEmitter.on(".exit", (args) =>
  execute(() => {
    if (args.length > 0) {
      throw new Error("Invalid input");
    }

    process.exit(process.exitCode);
  })
);
