import ncp from "ncp";
import { promisify } from "util";
import path from "path";
const copy = promisify(ncp);
import { fileURLToPath } from "url";
import fs from "fs";

export async function enableESLint(targetDir) {
  const currentFileUrl = import.meta.url;
  const lintDirectory = path.resolve(
    decodeURI(fileURLToPath(currentFileUrl)),
    "../../../public/lint"
  );
  const uri = path.resolve(targetDir, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(uri));
  packageJson.scripts["lint:fix"] = "eslint src --fix";
  packageJson.devDependencies["eslint"] = "^8.19.0";
  (packageJson.devDependencies["eslint-config-google"] = "^0.14.0"),
    (packageJson.devDependencies["eslint-config-prettier"] = "^8.5.0"),
    (packageJson.devDependencies["eslint-plugin-prettier"] = "^4.2.1"),
    (packageJson.devDependencies["prettier"] = "^2.7.1");
  fs.writeFileSync(uri, JSON.stringify(packageJson, null, 2));
  await copy(lintDirectory, targetDir, { clobber: false });

  return true;
}
