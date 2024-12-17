import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
    cooldown: 3,
    usage: "/ping",
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Return the clients latency."),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle("Latency")
            .addFields({
                name: "Latency",
                value: `${Date.now() - interaction.createdTimestamp}ms`,
                inline: true
            }, {
                name: "API Latency",
                value: `${Math.round(client.ws.ping)}ms`,
                inline: true
            })
            .setColor("#0000FF")
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        return await interaction.reply({ embeds: [embed] });
    }
};