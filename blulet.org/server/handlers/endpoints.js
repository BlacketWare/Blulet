import { fileURLToPath } from "url";
import { json, urlencoded } from "express";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import cors from "cors";

export default async function setupRoutes(app, baseDir = "", globalMiddlewares = []) {
    for (const middleware of globalMiddlewares) app.use(middleware);

    app.use(cors({ origin: ["https://dev.blulet.org", "https://blulet.org"], credentials: true }));
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.set("trust proxy", 1);
    app.disable("etag");

    const dir = path.join(fileURLToPath(import.meta.url), "..", "..", "endpoints");
    const currentDir = dir.concat("/".concat(baseDir));
    const files = fs.readdirSync(currentDir);

    for (const file of files) {
        if (!file.includes(".")) {
            setupRoutes(app, path.join(baseDir, file));
            continue;
        }

        const module = (await import(path.join(currentDir, file))).default;
        const methods = module.methods;

        if (file === "index.js") {
            if (module.auth) methods.forEach(method => app[method](`/api${path.join(currentDir.replace(dir, ""))}`, ...module.middlewares || [], async (req, res) => {
                const token = req.headers.authorization?.split(" ")[1];
                if (!token) return res.status(401).json({ error: "No JWT token was provided in the request." });
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    const user = await global.database.models.User.findOne({ where: { id: decoded.id } });
                    if (!user) return res.status(401).json({ error: "An invalid JWT token was provided in the request." });
                    req.user = user;
                    module[method](req, res);
                } catch (e) {
                    return res.status(401).json({ error: "An invalid JWT token was provided in the request." });
                }
            }));
            else methods.forEach(method => app[method](`/api${path.join(currentDir.replace(dir, ""))}`, ...module.middlewares || [], module[method]));
            continue;
        };

        if (module.auth) methods.forEach(method => app[method](`/api${path.join(currentDir.replace(dir, ""), file).replace(".js", "")}`, ...module.middlewares || [], async (req, res) => {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) return res.status(401).json({ error: "No JWT token was provided in the request." });
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await global.database.models.User.findOne({ where: { id: decoded.id } });
                if (!user) return res.status(401).json({ error: "An invalid JWT token was provided in the request." });
                req.user = user;
                module[method](req, res);
            } catch (_) {
                return res.status(401).json({ error: "An invalid JWT token was provided in the request." });
            }
        }));
        else methods.forEach(method => app[method](`/api${path.join(currentDir.replace(dir, ""), file).replace(".js", "")}`, ...module.middlewares || [], module[method]));
    };
};