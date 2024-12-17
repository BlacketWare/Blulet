import express, { Application } from "express";
import maxListenersExceededWarning from "max-listeners-exceeded-warning";
import endpointHandler from "./handlers/endpointHandler";
import dbConfig from "./handlers/dbConfig";

const app: Application = express();

await import("dotenv/config");
await dbConfig();
await endpointHandler(app, "", []);

app.listen(process.env.port || 4600, () => console.log(`[Blulet] Server started on port ${process.env.PORT || 4600}`));

// Used to prevent memory links from event listeners
maxListenersExceededWarning();