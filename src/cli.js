import { parseArgumentsIntoOptions } from "./utils/parseArgs.js";
import { promptForMissingOptions } from "./utils/missingArg.js";
import { createProject } from "./main.js";

export async function cli(args) {
  const rawOptions = parseArgumentsIntoOptions(args);

  const options = await promptForMissingOptions(rawOptions);

  await createProject(options);
}
