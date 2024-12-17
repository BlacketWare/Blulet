import { blacklisted, requests, sessions } from "./middlewares/index";
import express, { Application } from "express";
import expressWs, { WithWebsocketMethod } from "express-ws";
import maxListenersExceededWarning from "max-listeners-exceeded-warning";
import endpointHandler from "./handlers/endpointHandler/index";
import dbConfig from "./handlers/dbConfig/index";
import wsConfig from "./socket/init";

const app: Application = express().use((_, res, next) => res.setHeader("X-Powered-By", "monkxy") && next());
expressWs(app).getWss().on("error", (err) => console.error(err));

await import("dotenv/config");
await dbConfig();
await endpointHandler(app, "", [blacklisted, requests, sessions]);
wsConfig(app as Application & WithWebsocketMethod);

app.listen(process.env.port || 4000, () => console.log(`[Blulet] Server started on port ${process.env.PORT || 4000}`));

// Used to prevent memory links from event listeners
maxListenersExceededWarning();