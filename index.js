import process from "node:process";

const getUserNameFromArgs = (args) => {
  const usernameParam = args.find((arg) => arg.startsWith("--username"));

  const [_, name] = usernameParam.split("=");

  return name;
};

const startArguments = process.argv.slice(2);

const username = getUserNameFromArgs(startArguments);

console.log(`Welcome to the File Manager, ${username}!`);

process.stdin.setEncoding("utf8").on("data", (command) => {});

process.on("SIGINT", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
});
