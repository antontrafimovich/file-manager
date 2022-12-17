import { commandsEmitter, execute } from "../../emitter.js";
import { add } from "./add.js";
import { cat } from "./cat.js";
import { cp } from "./cp.js";
import { mv } from "./mv.js";
import { rm } from "./rm.js";
import { rn } from "./rn.js";

commandsEmitter
  .on("cat", async ([pathToFile]) => {
    execute(() => cat(pathToFile));
  })
  .on("add", async ([fileName]) => {
    execute(() => add(fileName));
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
