import { cp } from "./cp.js";
import { rm } from "./rm.js";

export const mv = async (pathToFile, pathToDirectory) => {
  try {
    await cp(pathToFile, pathToDirectory);
    await rm(pathToFile);
  } catch (err) {
    throw err;
  }
};
