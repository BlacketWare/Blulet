import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
    cooldown: 3,
    usage: "/untimeout <user>",
    data: new SlashCommandBuilder()
        .setName("untimeout")
        .setDescription("Untimeout a user")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDMPermission(false)
        .addUserOption(option => option.setName("user").setDescription("The user to timeout").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("The reason for muting the user")),
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const member = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString("reason") || "No reason provided.";

        if (user.id === interaction.user.id) return interaction.reply({ embeds: [new EmbedBuilder().setTitle("Error").setDescription("You cannot untimeout yourself").setColor("#FF0000").setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTimestamp()], ephemeral: true });
        if (member.communicationDisabledUntilTimestamp === null) return interaction.reply({ embeds: [new EmbedBuilder().setTitle("Error").setDescription("This user is not timed out").setColor("#FF0000").setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTimestamp()], ephemeral: true });
        
        await member.timeout(null, { reason: `${interaction.user.tag} (${interaction.user.id}): ${reason}` });
        try { await user.send({ embeds: [new EmbedBuilder().setTitle("You have been unmuted").setDescription("Thank you for your patience!").setColor("#00FF00").setTimestamp()]}); } catch {};

        return await interaction.reply({ embeds: [new EmbedBuilder().setTitle("Success").setDescription(`Successfully untimed out ${user.tag}`).setColor("#00FF00").setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTimestamp()] });
    }
};