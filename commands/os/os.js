import { arch, cpus, EOL, homedir, userInfo } from "node:os";

import { throwInvalidInputError } from "../../utils/error.js";

const OPTIONS_LIST = [
  "--EOL",
  "--cpus",
  "--homedir",
  "--username",
  "--architecture",
];

export const os = (option) => {
  if (!OPTIONS_LIST.includes(option)) {
    throwInvalidInputError();
  }

  if (option === "--EOL") {
    return printEOL();
  }

  if (option === "--cpus") {
    return printCPUSInfo();
  }

  if (option === "--homedir") {
    return printHomedir();
  }

  if (option === "--username") {
    return printUsername();
  }

  if (option === "--architecture") {
    return printArchitecture();
  }
};

const printEOL = () => {
  console.log(JSON.stringify(EOL));
};

const printCPUSInfo = () => {
  const cpusInfo = cpus();

  console.log(`There're ${cpusInfo.length} CPUS:`);

  const cpusTableFormat = cpusInfo.map((cpu) => {
    return {
      Model: cpu.model,
      "Clock Rate": `${cpu.speed / 1000} GHz`,
    };
  });

  console.table(cpusTableFormat);
};

const printHomedir = () => {
  console.table(`Home directory: ${homedir}`);
};

const printUsername = () => {
  console.table(`Username: ${userInfo().username}`);
};

const printArchitecture = () => {
  console.table(`Architecture: ${arch()}`);
};
