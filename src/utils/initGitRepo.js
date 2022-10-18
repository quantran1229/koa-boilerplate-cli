import { execa } from "execa";

import ncp from "ncp";
import { promisify } from "util";
import path from "path";
const copy = promisify(ncp);
import { fileURLToPath } from "url";
import fs from "fs";

export async function initGitRepo(targetDir) {
  const currentFileUrl = import.meta.url;
  const gitignoreDirectory = path.resolve(
    decodeURI(fileURLToPath(currentFileUrl)),
    "../../../public/git"
  );
  const [result] = await Promise.all([
    execa("git", ["init"], {
      cwd: targetDir,
    }),
    copy(gitignoreDirectory, targetDir, { clobber: false }),
  ]);

  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }

  fs.renameSync(
    path.resolve(targetDir, ".gitignore.txt"),
    path.resolve(targetDir, ".gitignore")
  );

  return true;
}
