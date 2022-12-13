import { EOL } from "node:os";

const OPTIONS_LIST = [
  "--EOL",
  "--cpus",
  "--homedir",
  "--username",
  "--architecture",
];

export const os = (option) => {
  if (!OPTIONS_LIST.includes(option)) {
    throw new Error("Invalid input");
  }

  if (option === "--EOL") {
    return printEOL();
  }
};

const printEOL = () => {
  console.log(JSON.stringify(EOL));
};
