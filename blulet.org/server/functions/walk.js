import { readdirSync } from "fs";
import { join } from "path";

export default function* walk(dir) {
    for (const file of readdirSync(dir, { withFileTypes: true })) file.isDirectory() ? yield* walk(join(dir, file.name)) : yield join(dir, file.name);
}