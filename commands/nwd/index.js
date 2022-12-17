import { commandsEmitter, execute } from "../../emitter.js";
import { throwInvalidInputError } from "../../utils/error.js";
import { cd } from "./cd.js";
import { ls } from "./ls.js";
import { up } from "./up.js";

commandsEmitter
  .on("up", () => execute(() => up()))
  .on("cd", (params) => {
    execute(async () => {
      if (params.length > 1) {
        throwInvalidInputError();
      }

      const [changeDirectoryTo] = params;
      await cd(changeDirectoryTo);
    });
  })
  .on("ls", () => {
    execute(() => ls());
  });
