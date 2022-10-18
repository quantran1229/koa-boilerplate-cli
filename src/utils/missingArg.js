import inquirer from "inquirer";

// default values for unspecified args
const defaultOptions = {
  git: false,
  install: true,
  template: "javascript",
  name: "koa-sequelize",
  lint: false,
  docker: false,
  version: 1,
  orm: "sequelize",
};

// --yes flag is passed
const skipOptions = {
  git: true,
  install: true,
  lint: true,
  orm: "sequelize",
  docker: true,
  version: 1,
};

export async function promptForMissingOptions(options) {
  if (options.skipPrompts) {
    options = { ...options, ...skipOptions };
  }

  const questions = [];

  if (!options.name) {
    questions.push({
      type: "input",
      name: "name",
      message: "Please enter your project name",
      default: defaultOptions.name,
    });
  }

  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: [
        { name: "JavaScript", value: "javascript" },
        // { name: 'TypeScript', value: 'typescript' }
      ],
      default: defaultOptions.template,
    });
  }

  if (!options.version) {
    questions.push({
      type: "list",
      name: "version",
      message: "Please choose which version you want to use",
      choices: [
        { name: "Minimize(Only routes and controllers)", value: 0 },
        { name: "Default", value: 1 },
        { name: "Default with User example", value: 2 },
      ],
      default: defaultOptions.version,
    });
  }

  // TODO: Add ORM choose
  // if (!options.orm && ((options.version && options.version != 0) ||(options.version && options.version))) {
  //     questions.push({
  //         type: 'list',
  //         name: 'orm',
  //         message: 'Please choose which ORM you want to use',
  //         choices: [
  //             { name: 'Sequelize', value: 'sequelize' },
  //             { name: 'Minimize(Only routes and controllers)', value: 0 },
  //             { name: 'With example (User)', value: 2 },
  //         ],
  //         default: defaultOptions.orm
  //     });
  // }
  if (!options.skipPrompts) {
    questions.push({
      type: "checkbox",
      name: "addons",
      message: "Select Addons?",
      choices: [
        { name: "Initialize a git repository", value: "git" },
        { name: "Enable ESLint (https://eslint.org/)", value: "lint" },
        { name: "Setting up dockerfile", value: "docker" },
      ],
      default: [false, false, false],
    });
    if (!options.install) {
      questions.push({
        type: "confirm",
        name: "install",
        message: "Install packages?",
        default: defaultOptions.install,
      });
    }
  }

  const answers = await inquirer.prompt(questions);
  answers.addons = answers.addons || [];

  return {
    git: options.git || answers.addons.includes("git"),
    install: options.install || answers.install,
    template: options.template || answers.template,
    name: options.name || answers.name,
    lint: options.lint || answers.addons.includes("lint"),
    docker: options.docker || answers.addons.includes("docker"),
    version: options.version || answers.version,
    orm: options.orm || answers.orm,
  };
}
