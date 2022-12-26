import process from "node:process";

export const getArgumentByKey = (key) => {
  const startArguments = process.argv.slice(2);
  const argument = startArguments.find((arg) => arg.startsWith(key));

  if (!argument) {
    return null;
  }

  const [, value] = argument.split("=");

  return value;
};
