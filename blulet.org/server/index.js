const start = Date.now();
await import("dotenv/config");
import express from "express";
import console from "#functions/console";
import middleware from "#middleware";

const app = express();
// const wss = new WebSocketServer({ path: "/api/v2/ws", port: 4003 });
// wss.on("connection", (ws, req) => {
//     ws.on("message", (message) => {
//         console.debug(message);
//     });
//     ws.send("Hello");
// });

await (await import("./handlers/database.js")).default();
await (await import("./handlers/endpoints.js")).default(app, "", [middleware.request]);
await (await import("./handlers/cache.js")).default();
await (await import("./socket/index.js")).default();

app.listen(process.env.PORT, () => {
    console.success(`Server has been started on port ${process.env.PORT}`);
    console.debug(`Startup time: ${Date.now() - start}ms`);
    console.debug(`Process ID: ${process.pid}`);
});