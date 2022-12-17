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
  .on("add", (params) => {
    execute(async () => {
      if (params.length > 1) {
        throwInvalidInputError();
      }

      const [fileName] = params;

      await add(fileName);
    });
  })
  .on("rn", async ([pathToFile, newFileName]) => {
    execute(() => rn(pathToFile, newFileName));
  })
  .on("cp", async ([pathToFile, pathToDirectory]) => {
    execute(() => cp(pathToFile, pathToDirectory));
  })
  .on("rm", async ([pathToFile]) => {
    execute(() => rm(pathToFile));
  })
  .on("mv", async ([pathToFile, pathToDirectory]) => {
    execute(() => mv(pathToFile, pathToDirectory));
  });
