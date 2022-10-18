import ncp from "ncp";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const copy = promisify(ncp);

export async function copyTemplateFiles(templateDir, targetDir, name) {
  await copy(templateDir, targetDir, { clobber: false });
  const uri = path.resolve(targetDir, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(uri));
  packageJson.name = name.replace(/\s/g, "-");
  fs.writeFileSync(uri, JSON.stringify(packageJson, null, 2));
  return true;
}
