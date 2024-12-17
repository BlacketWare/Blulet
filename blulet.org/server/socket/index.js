import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import walk from "#functions/walk";
import console from "#functions/console";

export default async () => {
    const wss = new WebSocketServer({ port: 4003, path: "/api/v2/ws" });
    let events = [];
    global.clients = {};
    const heartbeat = () => setInterval(() => {
        for (const client in global.clients) {
            if (global.clients[client].isAlive === false) {
                delete global.clients[client];
                continue;
            }

            global.clients[client].isAlive = false;
            global.clients[client].ping();
        }
    }, 30000);

    console.info("Loading socket events...");

    for (const file of walk("./socket/events")) {
        if (!file.endsWith(".js")) continue;

        const event = (await import(`../${file}`)).default;

        events.push(event);
    }

    console.success(`Loaded ${events.length} socket event(s).`);

    wss.on("connection", async (ws, req) => {
        if (!req.url.includes("?auth=")) return ws.close(4001, "Unauthorized");
        try {
            const decoded = jwt.verify(req.url.split("?auth=")[1], process.env.JWT_SECRET);
            const user = await global.database.models.User.findOne({ where: { id: decoded.id } });
            if (!user) return ws.close(4001, "Unauthorized");
            if (global.clients[user.id]) return ws.close(4090, "Already connected");
            global.clients[user.id] = ws;
            ws.user = user.id;
            ws.isAlive = true;
            ws.on("pong", () => ws.isAlive = true);
            heartbeat();
        } catch (error) {
            return ws.close(4001, "Unauthorized");
        }

        console.info(`Client ${ws.user} connected.`);
        ws.send(JSON.stringify({ event: "connected" }));
        ws.on("message", async (message) => {
            const data = JSON.parse(message);
            const event = events.find(event => event.name === data.event);
            if (!event) return ws.close(4002, "Invalid event");
            event.execute(ws, data);
        });
        ws.on("close", () => {
            console.info(`Client ${ws.user} disconnected.`);
            delete global.clients[ws.user];
        });
    });
};