import { EOL, cpus, homedir } from "node:os";

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

  if (option === "--cpus") {
    return printCPUSInfo();
  }

  if (option === "--homedir") {
    return printHomedir();
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
