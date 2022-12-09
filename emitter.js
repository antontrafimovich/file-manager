import { EventEmitter } from "node:events";

export const EVENTS_LIST = ["up", "cd", "ls", "cat", "add"];

export const commandsEmitter = new EventEmitter();
