import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Application, Request, Response, NextFunction, json, urlencoded } from "express";
import cors from "cors";

type methods = Array<"get" | "post" | "patch" | "delete" | "put">;

export default async function setupRoutes(app: Application, baseDir = "", globalMiddlewares: Array<any> = []) {
    for (const middleware of globalMiddlewares) app.use(middleware);

    app.use(cors({ origin: ["https://dev.blulet.org", "https://blulet.org"], credentials: true }));
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.set("trust proxy", 1);
    app.disable("etag");

    const dir = path.join(fileURLToPath(import.meta.url), "..", "..", "..", "endpoints");
    const currentDir = dir.concat("/".concat(baseDir));
    const files = fs.readdirSync(currentDir);

    for (const file of files) {
        if (!file.includes(".")) {
            setupRoutes(app, path.join(baseDir, file));
            continue;
        }

        const module = (await import(path.join(currentDir, file))).default;
        const methods: methods = module.methods;

        if (file === "index.js" || file === "index.ts") {
            methods.forEach(method => app[method](`/api${path.join(currentDir.replace(dir, ""))}`, ...module.middlewares || [], module[method]));
            continue;
        };

        methods.forEach(method => app[method](`/api${path.join(currentDir.replace(dir, ""), file).replace(".js", "").replace(".ts", "")}`, ...module.middlewares || [], module[method]));
    };
};