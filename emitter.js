import { EventEmitter } from "node:events";

export const EVENTS_LIST = ["up", "cd", "ls", "cat", "add", "rn"];

export const commandsEmitter = new EventEmitter();
