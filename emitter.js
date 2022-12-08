import { EventEmitter } from "node:events";

export const EVENTS_LIST = ["up", 'cd', 'ls'];

export const commandsEmitter = new EventEmitter();
