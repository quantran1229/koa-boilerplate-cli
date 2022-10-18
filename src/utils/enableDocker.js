import ncp from "ncp";
import { promisify } from "util";
import path from "path";
const copy = promisify(ncp);
import { fileURLToPath } from "url";
import fs from "fs";

export async function enableDocker(targetDir) {
  const currentFileUrl = import.meta.url;
  const dockerDirectory = path.resolve(
    decodeURI(fileURLToPath(currentFileUrl)),
    "../../../public/docker"
  );
  const uri = path.resolve(targetDir, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(uri));
  packageJson.scripts["build:docker"] =
    "babel src -d dist && docker-compose up -d";
  fs.writeFileSync(uri, JSON.stringify(packageJson, null, 2));
  await copy(dockerDirectory, targetDir, { clobber: false });

  return true;
}
