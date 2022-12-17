import { commandsEmitter } from "../../emitter.js";
import { os } from "./os.js";



commandsEmitter.on("os", ([option]) => execute(() => os(option)));
