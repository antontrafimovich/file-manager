import { commandsEmitter } from '../../emitter.js';
import { cd } from './cd.js';
import { ls } from './ls.js';
import { up } from './up.js';

const execute = async (command) => {
  try {
    await command();
  } catch (error) {
    commandsEmitter.emit("error", { message: "Invalid Input" });
  } finally {
    commandsEmitter.emit("commandEnd");
  }
};

commandsEmitter
  .on("up", () => execute(() => up()))
  .on("cd", async (params) => {
    execute(async () => {
      if (params.length > 1) {
        throw new Error("Invalid input");
      }

      const [changeDirectoryTo] = params;
      await cd(changeDirectoryTo);
    });
  })
  .on("ls", async () => {
    execute(() => ls());
  });
