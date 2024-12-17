await import("dotenv/config");
await import("#utils/walk.js");
import { Client, IntentsBitField, Collection } from "discord.js";
import { connect } from "mongoose";

const client = new Client({ intents: new IntentsBitField(131071) });
await connect(process.env.MONGO_URI || "").then(() => console.log("[Blulet] MongoDB connection established")).catch(console.error);
global.config = (await import("../config.json", { assert: { type: "json" } })).default;
client.commands = new Collection();
client.cooldowns = new Collection();
client.login(process.env.TOKEN);

for await (const file of global.walk("src/handlers")) {
    if (!file.endsWith(".js")) continue;
    const handler = (await import(`../${file}`)).default;
    handler(client);
};