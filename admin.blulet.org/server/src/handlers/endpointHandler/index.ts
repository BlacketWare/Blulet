import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Application, Request, Response, NextFunction, json, urlencoded } from "express";
import cors from "cors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type methods = Array<"get" | "post" | "patch" | "delete" | "put">;
interface endpoint {
    middlewares?: Array<any>;
    methods: methods;
    paramas?: Array<string>;
    get?: (req: Request, res: Response) => void;
    post?: (req: Request, res: Response) => void;
    patch?: (req: Request, res: Response) => void;
    delete?: (req: Request, res: Response) => void;
    put?: (req: Request, res: Response) => void;
}

export default async function setupRoutes(app: Application, baseDir = "", globalMiddlewares: Array<any> = []) {
    for (const middleware of globalMiddlewares) app.use(middleware);

    app.use(cors({origin: "*", credentials: true }));
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.set("trust proxy", 1);

    const dir = path.join(__dirname, "..", "..", "endpoints");
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
        }

        methods.forEach(method => app[method](`/api${path.join(currentDir.replace(dir, ""), file).replace(".js", "").replace(".ts", "")}`, ...module.middlewares || [], module[method]));
    }
}