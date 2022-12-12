import { EventEmitter } from "node:events";

export const EVENTS_LIST = ["up", "cd", "ls", "cat", "add", "rn", "cp", "rm"];

export const commandsEmitter = new EventEmitter();
