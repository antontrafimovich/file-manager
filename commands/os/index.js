import { commandsEmitter, execute } from "../../emitter.js";
import { throwInvalidInputError } from "../../utils/error.js";
import { os } from "./os.js";

commandsEmitter.on("os", (params) =>
  execute(() => {
    if (params.length > 1) {
      throwInvalidInputError();
    }

    const [option] = params;
    os(option);
  })
);
