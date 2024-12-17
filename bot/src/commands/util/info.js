import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import os from "os";

export default {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Get information about the bot and server"),
    async execute(interaction, client) {
        const guild = await client.guilds.fetch(process.env.GUILD);
        const embed = new EmbedBuilder()
            .setTitle("Information")
            .setColor("#0000FF")
            .setTimestamp()
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.avatarURL()
            })
            .addFields({ name: "CPU Model", value: os.cpus()[0].model, inline: true }, { name: "CPU Cores", value: os.cpus().length.toString(), inline: true }, { name: "CPU Speed", value: `${os.cpus()[0].speed.toString()} MHz`, inline: true }, { name: "CPU Architecture", value: os.arch(), inline: true }, { name: "CPU Platform", value: os.platform(), inline: true }, { name: "CPU Uptime", value: `${Math.floor(os.uptime() / 3600).toString()} hours`, inline: true }, { name: "CPU Load", value: `${os.loadavg()[0].toString()}%`, inline: true }, { name: "Memory Usage", value: `${Math.floor(process.memoryUsage().heapUsed / 1024 / 1024).toString()} MB`, inline: true }, { name: "Total Memory", value: `${Math.floor(os.totalmem() / 1024 / 1024).toString()} MB`, inline: true }, { name: "Free Memory", value: `${Math.floor(os.freemem() / 1024 / 1024).toString()} MB`, inline: true }, { name: "Guild Name", value: guild.name, inline: true }, { name: "Guild ID", value: guild.id.toString(), inline: true }, { name: "Guild Owner", value: guild.ownerId.toString(), inline: true }, { name: "Guild Members", value: guild.memberCount.toString(), inline: true }, { name: "Guild Channels", value: guild.channels.cache.size.toString(), inline: true }, { name: "Guild Roles", value: guild.roles.cache.size.toString(), inline: true }, { name: "Guild Emojis", value: guild.emojis.cache.size.toString(), inline: true });
        await interaction.reply({ embeds: [embed] });
    }
};