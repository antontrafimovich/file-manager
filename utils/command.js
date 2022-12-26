export const parseCommandString = (command) => {
  const splitRegexp = /[^\s"']+|"([^"]*)"|'([^']*)'/gi;

  let operation;
  const args = [];

  let match;
  do {
    match = splitRegexp.exec(command);

    if (match === null) {
      continue;
    }

    const matchedOperation = match[0] ?? match[1] ?? match[2];

    if (matchedOperation && !operation) {
      operation = matchedOperation;
      continue;
    }

    const matchedArg = match[1] ?? match[2] ?? match[0];

    if (matchedArg) {
      args.push(matchedArg);
    }
  } while (match != null);

  return {
    operation,
    args,
  };
};
