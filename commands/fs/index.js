import { commandsEmitter, execute } from "../../emitter.js";
import { throwInvalidInputError } from "../../utils/error.js";
import { add } from "./add.js";
import { cat } from "./cat.js";
import { cp } from "./cp.js";
import { mv } from "./mv.js";
import { rm } from "./rm.js";
import { rn } from "./rn.js";

commandsEmitter
  .on("cat", (params) =>
    execute(async () => {
      if (params.length > 1) {
        throwInvalidInputError();
      }

      const [pathToFile] = params;
      await cat(pathToFile);
    })
  )
  .on("add", (params) =>
    execute(async () => {
      if (params.length > 1) {
        throwInvalidInputError();
      }

      const [fileName] = params;

      await add(fileName);
    })
  )
  .on("rn", (params) =>
    execute(async () => {
      if (params.length > 2) {
        throwInvalidInputError();
      }

      const [pathToFile, newFileName] = params;
      await rn(pathToFile, newFileName);
    })
  )
  .on("cp", (params) =>
    execute(async () => {
      if (params.length > 2) {
        throwInvalidInputError();
      }

      const [pathToFile, pathToDirectory] = params;
      await cp(pathToFile, pathToDirectory);
    })
  )
  .on("rm", (params) =>
    execute(async () => {
      if (params.length > 1) {
        throwInvalidInputError();
      }

      const [pathToFile] = params;
      await rm(pathToFile);
    })
  )
  .on("mv", (params) =>
    execute(async () => {
      if (params.length > 2) {
        throwInvalidInputError();
      }

      const [pathToFile, pathToDirectory] = params;
      await mv(pathToFile, pathToDirectory);
    })
  );
