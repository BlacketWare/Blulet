import { EmbedBuilder } from "discord.js";

export default {
    name: "messageUpdate",
    once: false,
    async execute(oldMessage, newMessage, client) {
        let attachments = [];
        const guild = await client.guilds.fetch(process.env.GUILD);
        const channel = await guild.channels.fetch(global.config.channels.messageLog.id);
        if (oldMessage.author.bot) return;
        if (oldMessage.content.length > 1000) oldMessage.content = oldMessage.content.slice(0, 1000);
        if (oldMessage.attachments.size > 0) for (let attachment of oldMessage.attachments.values()) attachments.push(attachment.url);

        if (newMessage.author.bot) return;
        if (newMessage.content.length > 1000) newMessage.content = newMessage.content.slice(0, 1000);
        if (newMessage.attachments.size > 0) for (let attachment of newMessage.attachments.values()) attachments.push(attachment.url);

        const embed = new EmbedBuilder()
            .setTitle("Message Edited")
            .setAuthor({
                name: `${newMessage.author.tag} (${newMessage.author.id})`,
                iconURL: newMessage.author.displayAvatarURL({ dynamic: true })
            })
            .addFields(
                { name: "Old Content", value: oldMessage.content || "None" },
                { name: "New Content", value: newMessage.content || "None" },
                { name: "Channel", value: `<#${newMessage.channel.id}>` },
                { name: "Attachments", value: attachments.length > 0 ? attachments.join("\n") : "None" }
            )
            .setColor("#FFFF00")
            .setTimestamp();

        await channel.send({ embeds: [embed] });
    }
};