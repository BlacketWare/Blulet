import { Application } from "express";
import { WithWebsocketMethod } from "express-ws";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readdirSync } from "fs";
import User from "../schema/User";
import WebSocket from "ws";
import WebSocketRateLimiter from "../middlewares/utils/WsRateLimit";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rateLimiter = new WebSocketRateLimiter({ max: 5, delay: 10000 }); 

export default async (app: Application & WithWebsocketMethod) => {
    let clients: Record<string, WebSocket> = {};
    let events: any[] = [];

    const dir = join(__dirname, "..", "socket", "events");
    const files = readdirSync(dir);
    for (const file of files) {
        if (!file.endsWith("")) continue;
        events.push((await import(join(dir, file))).default);
    };

    const sendHeartbeat = (ws: WebSocket) => {
        ws.send(JSON.stringify({ event: "heartbeat" }));
    };

    app.ws("/api/v1/ws", async (ws, req) => {
        if (!req.session || !req.session.userId) return ws.send(JSON.stringify({ status: 401, messerrorage: "You must be logged in to perform this action." }));
        if (clients[req.session.userId]) return ws.send(JSON.stringify({ status: 409, error: "You are already connected to the websocket." }));
        const user = await User.findById(req.session.userId);
        if (!user) return ws.send(JSON.stringify({ status: 401, error: "You must be logged in to perform this action." }));
        if (user.ban.banned) return ws.send(JSON.stringify({ status: 403, error: `You are currently banned for ${user.ban.reason}. This ban will expire on ${new Date(user.ban.until).toLocaleString()}.` }));
        clients[req.session.userId] = ws;

        setInterval(() => sendHeartbeat(ws), 10000);

        ws.on("message", (msg) => {
            if (!msg) return ws.send(JSON.stringify({ status: 400, error: "You must provide a message." }));
            if (rateLimiter.execute(req.session.userId)) return ws.send(JSON.stringify({ status: 429, error: "You are being rate limited." }));
            
            try {
                const data = JSON.parse(msg.toString());
                if (!data.event) return ws.send(JSON.stringify({ status: 400, error: "You must provide an event." }));
                const event = events.find(event => event.name === data.event);
                if (!event) return ws.send(JSON.stringify({ status: 400, error: "Invalid event." }));
                event.execute(ws, data, clients, req.session.userId);
            } catch {
                ws.send(JSON.stringify({ status: 400, error: "Invalid JSON data." }));
            };
        });

        ws.on("close", () => delete clients[req.session.userId]);
    });

    console.log("[Blulet] Websocket server started. All events were successfully loaded.");
};
