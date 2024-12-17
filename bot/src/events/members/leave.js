export default {
    name: "guildMemberRemove",
    once: false,
    async execute(member, client) {
        if (member.user.bot) return;
        const guild = await client.guilds.fetch(process.env.GUILD);
        const channel = await client.channels.fetch(global.config.channels.memberCount.id);
        return channel.setName(`${global.config.channels.memberCount.prefix}: ${guild.memberCount.toString()}`);
    }
};