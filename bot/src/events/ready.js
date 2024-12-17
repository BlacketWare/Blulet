import { ActivityType } from "discord.js";

export default {
    name: "ready",
    once: true,
    async execute(client) {
        const guild = await client.guilds.fetch(process.env.GUILD);
        const channel = await client.channels.fetch(global.config.channels.memberCount.id);
        channel.setName(`${global.config.channels.memberCount.prefix}: ${guild.memberCount.toString()}`);
        await client.user.setPresence({ status: "dnd", activities: [{ name: "the Blulet API", type: ActivityType.Watching }] });
        console.log(`[Blulet] Initialized as ${client.user.tag}`);
    }
};