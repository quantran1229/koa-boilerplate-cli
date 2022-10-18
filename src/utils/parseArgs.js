import arg from "arg";

export function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--yes": Boolean,
      "--install": Boolean,
      "--name": String,
      "-y": "--yes",
      "-i": "--install",
      "-n": "--name",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    install: args["--install"] || false,
    skipPrompts: args["--yes"] || false,
    template: args._[0],
    name: args["--name"] || args._[1],
  };
}
