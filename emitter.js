import { EventEmitter } from "node:events";

export const EVENTS_LIST = ["up", "cd", "ls", "cat", "add", "rn", "cp"];

export const commandsEmitter = new EventEmitter();
