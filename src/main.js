import Listr from "listr";
import path from "path";
import { fileURLToPath } from "url";
import { copyTemplateFiles } from "./utils/copyTemplateFile.js";
import { initGitRepo } from "./utils/initGitRepo.js";
import { installPackages } from "./utils/installPackage.js";
import { createProjectFolder } from "./utils/createProjectFolder.js";
import { deleteAsync } from "del";
import { enableESLint } from "./utils/enableESLint.js";
import { enableDocker } from "./utils/enableDocker.js";
import { settingVersion } from "./utils/settingVersion.js";

export async function createProject(options) {
  const targetDirectory = path.join(process.cwd(), options.name);
  const currentFileUrl = import.meta.url;
  const templateDirectory = path.resolve(
    decodeURI(fileURLToPath(currentFileUrl)),
    "../../templates",
    options.template.toLowerCase()
  );
  const version = ["minimize", "default", "example"];
  const versionDirectory = path.resolve(
    decodeURI(fileURLToPath(currentFileUrl)),
    "../../public/version",
    options.template.toLowerCase(),
    version[options.version]
  );

  const tasks = new Listr([
    {
      title: `Create project folder for ${options.name}`,
      task: () => createProjectFolder(targetDirectory, options.name),
    },
    {
      title: `Copy project files from ${options.template.toLowerCase()} template`,
      task: () =>
        copyTemplateFiles(templateDirectory, targetDirectory, options.name),
    },
    {
      title: `Setting version of project: ${
        options.version == 0
          ? "Minimize"
          : options.version == 1
          ? "Default"
          : "Default with User example"
      }`,
      task: () => settingVersion(versionDirectory, targetDirectory),
      enabled: () => options.version !== 0,
    },
    {
      title: "Initialize git",
      task: () => initGitRepo(targetDirectory),
      enabled: () => options.git,
    },
    {
      title: "Enable ESLint for the project",
      task: () => enableESLint(targetDirectory),
      enabled: () => options.lint,
    },
    {
      title: `Setting up Dockerfile and docker-compose`,
      task: () => enableDocker(targetDirectory),
      enabled: () => options.docker,
    },
    {
      title: `Install dependencies koa, sequelize, babel with ${options.template.toLowerCase()} template.`,
      task: () => installPackages(targetDirectory),
      skip: () => {
        if (!options.install) {
          return "Pass --install or -i to automatically install dependencies";
        }
      },
    },
  ]);

  try {
    await tasks.run();
    console.log();
    console.log(
      `%s Success! Project ${options.name} is ready at ${targetDirectory}`,
      "\x1b[92mDONE\x1b[0m"
    );
    console.log();
    console.log("Inside that directory, you can run several commands:");
    if (options.lint) {
      console.log("");
      console.log("\x1b[1mLint code\x1b[0m");
      console.log("\x1b[94mnpm run lint:fix\x1b[0m");
    }
    console.log("");
    console.log("\x1b[1;3;4mI suggest that you begin by typing:\x1b[0m");
    console.log(`\x1b[94mcd ${options.name}\x1b[0m`);
    if (!options.install) {
      console.log("");
      console.log("\x1b[1mInstalling dependencies before running\x1b[0m");
      console.log("\x1b[94mnpm i\x1b[0m");
    }

    if (options.version === 2) {
      console.log("");
      console.log("\x1b[1mStart docker for test db\x1b[0m");
      console.log("\x1b[94mnpm run db:start\x1b[0m");
    }
    if (options.docker) {
      console.log("");
      console.log("\x1b[1mBuild and start docker\x1b[0m");
      console.log("\x1b[94mnpm run build:docker\x1b[0m");
    }
    console.log(
      "Starts the local server \x1b[1;34;3;4m(localhost:3000)\x1b[0m."
    );
    console.log("\x1b[94;1mnpm start\x1b[0m");
    console.log("");
    console.log("\x1b[1;4mHappy coding!\x1b[0m \x1b[1;95m(✿ ◠ ‿ ◠ )\x1b[0m");
  } catch (error) {
    await deleteAsync(targetDirectory);
    console.log(`%s Error occurred ${error}`, "\x1b[94mERROR\x1b[0m");
  }
}
