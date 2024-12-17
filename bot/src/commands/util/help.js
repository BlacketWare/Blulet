import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } from "discord.js";

export default {
    cooldown: 3,
    usage: "/help [command]",
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Returns the help embed")
        .addStringOption(option =>
            option.setName("command")
                .setDescription("The command to get help for")
                .setRequired(false)),
    async execute(interaction, client) {
        const commandName = interaction.options.getString("command");
        const commands = Array.from(client.commands.values());
        let currentPage = parseInt(commandName) || 1;

        if (commandName) {
            const command = commands.find(cmd => cmd.data.name === commandName);
            if (!command) return await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Error")
                    .setDescription("That command does not exist")
                    .setColor("#FF0000")
                    .setTimestamp()
                    .setFooter({
                        text: `Requested by ${interaction.user.tag}`,
                        iconURL: interaction.user.avatarURL()
                    })]
            });

            const embed = new EmbedBuilder()
                .setTitle(command.data.name)
                .setDescription(command.data.description)
                .addFields({ name: "Usage", value: command.usage || "No Usage" }, { name: "Cooldown", value: `${command.cooldown || 3} second(s)` })
                .setColor("#0000FF")
                .setTimestamp()
                .setFooter({
                    text: `Requested by ${interaction.user.tag}`,
                    iconURL: interaction.user.avatarURL()
                });

            await interaction.reply({ embeds: [embed] });
        };

        const updateEmbed = async () => {
            const embed = new EmbedBuilder()
                .setColor("#0000FF")
                .setTitle("Help")
                .setTimestamp()
                .setFooter({
                    text: `Requested by ${interaction.user.tag}`,
                    iconURL: interaction.user.avatarURL()
                });

            const page = Math.max(1, Math.ceil(commands.length / 5));
            const startIndex = (currentPage - 1) * 5;
            const endIndex = Math.min(startIndex + 5, commands.length);
            const visibleCommands = commands.slice(startIndex, endIndex);

            if (currentPage > page) return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Error")
                    .setDescription("Invalid page number")
                    .setColor("#FF0000")
                    .setTimestamp()
                    .setFooter({
                        text: `Requested by ${interaction.user.tag}`,
                        iconURL: interaction.user.avatarURL()
                    })]
            });


            if (currentPage <= page) {
                embed.setDescription(`Here is a list of all my commands (Page ${currentPage}/${page}):`);
                visibleCommands.forEach(command => embed.addFields({ name: command.data.name, value: command.data.description }));

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`help_page_prev_${interaction.user.id}_${currentPage - 1}_${Math.random.toString(36).substring(2, 12)}`)
                            .setLabel("Previous Page")
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(currentPage <= 1),
                        new ButtonBuilder()
                            .setCustomId(`help_page_next_${interaction.user.id}_${currentPage + 1}_${Math.random.toString(36).substring(2, 12)}`)
                            .setLabel("Next Page")
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(currentPage >= page)
                    );

                embed.setFooter({
                    text: `Requested by ${interaction.user.tag} | Page ${currentPage}/${page}`,
                    iconURL: interaction.user.avatarURL()
                });

                const components = [row];
                if (interaction.deferred || interaction.replied) await interaction.editReply({ embeds: [embed], components });
                else await interaction.reply({ embeds: [embed], components });
            }
        };

        const collector = interaction.channel.createMessageComponentCollector({
            filter: i => i.customId.startsWith("help_page_") && i.user.id === interaction.user.id,
            time: 10000,
            dispose: true
        });

        collector.on("collect", async i => {
            if (!i.isButton()) return;
            if (i.user.id !== interaction.user.id) return i.reply({ embeds: [new EmbedBuilder().setTitle("Error").setDescription("You cannot use this button").setColor("#FF0000").setTimestamp().setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })], ephemeral: true });

            if (i.customId.startsWith(`help_page_next_${interaction.user.id}`)) currentPage++;
            else if (i.customId.startsWith(`help_page_prev_${interaction.user.id}`)) currentPage--;

            await i.deferUpdate();
            await updateEmbed();
        });

        collector.on("end", async () => {
            const components = interaction.message?.components?.map((row) => row.components.filter((comp) => comp.type !== "BUTTON")).filter((row) => row.length > 0) || [];
            collector.stop();
            await interaction.editReply({ components });
        });

        await updateEmbed();
    },
};