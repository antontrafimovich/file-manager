import { commandsEmitter, execute } from "../../emitter.js";
import { throwInvalidInputError } from "../../utils/error.js";
import { cd } from "./cd.js";
import { ls } from "./ls.js";
import { up } from "./up.js";

commandsEmitter
  .on("up", (params) =>
    execute(() => {
      if (params.length > 0) {
        throwInvalidInputError();
      }

      up();
    })
  )
  .on("cd", (params) =>
    execute(async () => {
      if (params.length > 1) {
        throwInvalidInputError();
      }

      const [changeDirectoryTo] = params;
      await cd(changeDirectoryTo);
    })
  )
  .on("ls", (params) =>
    execute(async () => {
      if (params.length > 0) {
        throwInvalidInputError();
      }

      await ls();
    })
  );
