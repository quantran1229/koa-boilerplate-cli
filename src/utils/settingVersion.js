import ncp from "ncp";
import { promisify } from "util";

const copy = promisify(ncp);

export async function settingVersion(templateDir, targetDir) {
  await copy(templateDir, targetDir, { clobber: true });
  return true;
}
