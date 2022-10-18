import makeDir from "make-dir";

export async function createProjectFolder(targetDir) {
  return await makeDir(targetDir);
}
