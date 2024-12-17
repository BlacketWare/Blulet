import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js";
export default {
    cooldown: 3,
    usage: "/timeout <user> <time> [reason]",
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("Timeout a user for a specified amount of time")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDMPermission(false)
        .addUserOption(option => option.setName("user").setDescription("The user to timeout").setRequired(true))
        .addIntegerOption(option => option.setName("time").setDescription("The amount of time to timeout the user for (in minutes)").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("The reason for muting the user")),
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const member = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString("reason") || "No reason provided.";
        let duration = interaction.options.getInteger("time");
        duration = duration * 60000;

        if (duration > 2.419e+9 || duration < 1) return interaction.reply({ embeds: [new EmbedBuilder().setTitle("Error").setDescription("You cannot timeout a user for more than 28 days").setColor("#FF0000").setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTimestamp()], ephemeral: true });
        if (user.id === interaction.user.id) return interaction.reply({ embeds: [new EmbedBuilder().setTitle("Error").setDescription("You cannot timeout yourself").setColor("#FF0000").setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTimestamp()], ephemeral: true });
        if (interaction.guild.members.cache.get(user.id) && interaction.guild.members.cache.get(user.id).permissions.has(PermissionFlagsBits.ManageMessages)) return interaction.reply({ embeds: [new EmbedBuilder().setTitle("Error").setDescription("I cannot timeout this user").setColor("#FF0000").setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() }).setTimestamp()], ephemeral: true });

        await member.timeout(duration, { reason: `${interaction.user.tag} (${interaction.user.id}): ${reason}` });
        try { await user.send({ embeds: [new EmbedBuilder().setTitle("You have been muted").setDescription(`You have been muted in ${interaction.guild.name} for ${duration / 60000} minutes for ${reason}`).setColor("#FF0000").setTimestamp()] }); } catch { };
        return await interaction.reply({ embeds: [new EmbedBuilder().setTitle("Success").setDescription(`Successfully timed out ${user.tag} for ${duration / 60000} minutes`).setColor("#00FF00").setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTimestamp()] });
    }
};