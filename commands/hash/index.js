import { commandsEmitter, execute } from "../../emitter.js";
import { throwInvalidInputError } from "../../utils/error.js";
import { hash } from "./hash.js";

commandsEmitter.on("hash", (params) =>
  execute(async () => {
    if (params.length > 1) {
      throwInvalidInputError();
    }

    const [pathToFile] = params;
    await hash(pathToFile);
  })
);
