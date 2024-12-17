import { EmbedBuilder } from "discord.js";

export default {
    name: "messageDelete",
    once: false,
    async execute(message, client) {
        let attachments = [];
        const guild = await client.guilds.fetch(process.env.GUILD);
        const channel = await guild.channels.fetch(global.config.channels.messageLog.id);
        if (message.author.bot) return;
        if (message.content.length > 1000) message.content = message.content.slice(0, 1000);
        if (message.attachments.size > 0) for (let attachment of message.attachments.values()) attachments.push(attachment.url);

        let embed = new EmbedBuilder()
            .setTitle("Message Deleted")
            .setAuthor({
                name: `${message.author.tag} (${message.author.id})`,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .addFields(
                { name: "Content", value: message.content || "None" },
                { name: "Channel", value: `<#${message.channel.id}>` },
                { name: "Attachments", value: message.attachments.length > 0 ? attachments.join("\n") : "None" }
            )
            .setColor("#FF0000")
            .setTimestamp();

        await channel.send({ embeds: [embed] });
    }
};