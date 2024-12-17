import { readdirSync } from "fs";
import { join } from "path";

export default global.walk = function* walk(dir) {
    const files = readdirSync(dir, { withFileTypes: true });
    for (const file of files) file.isDirectory() ? yield* walk(join(dir, file.name)) : yield join(dir, file.name);
};