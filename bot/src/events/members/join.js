export default {
    name: "guildMemberAdd",
    once: false,
    async execute(member, client) {
        if (member.user.bot) return;
        const guild = await client.guilds.fetch(process.env.GUILD);
        const channel = await client.channels.fetch(global.config.channels.memberCount.id);
        channel.setName(`${global.config.channels.memberCount.prefix}: ${guild.memberCount.toString()}`);
        return await client.channels.fetch(global.config.channels.rules.id).then(c => c.send(`<@${member.id}>`).then(m => m.delete()));
    }
};