import { EventEmitter } from "node:events";

export const EVENTS_LIST = ["up", 'cd'];

export const commandsEmitter = new EventEmitter();
