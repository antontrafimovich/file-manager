import { commandsEmitter, execute } from "../../emitter.js";
import { throwInvalidInputError } from "../../utils/error.js";
import { compress } from "./compress.js";
import { decompress } from "./decompress.js";

commandsEmitter
  .on("compress", (params) =>
    execute(async () => {
      if (params.length > 2) {
        throwInvalidInputError();
      }

      const [pathToFile, pathToDestination] = params;
      await compress(pathToFile, pathToDestination);
    })
  )
  .on("decompress", (params) =>
    execute(async () => {
      if (params.length > 2) {
        throwInvalidInputError();
      }

      const [pathToFile, pathToDestination] = params;
      await decompress(pathToFile, pathToDestination);
    })
  );
