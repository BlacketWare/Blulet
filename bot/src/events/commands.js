import { Collection, EmbedBuilder } from "discord.js";

export default {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
        try {
            const { cooldowns } = client;
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            if (!cooldowns.has(command.data.name)) cooldowns.set(command.data.name, new Collection());

            const now = Date.now();
            const timestamps = cooldowns.get(command.data.name);
            const amount = (command.cooldown ?? 3) * 1000;
            if (timestamps.has(interaction.user.id)) {
                const expiration = timestamps.get(interaction.user.id) + amount;
                if (now < expiration) {
                    const remaining = (expiration - now) / 1000;
                    return await interaction.reply({ embeds: [new EmbedBuilder().setTitle("Erorr").setDescription(`You are on cooldown for ${command.data.name} for ${remaining.toFixed(1)} more seconds.`).setColor("#FF0000").setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() }).setTimestamp()] });
                };

                timestamps.set(interaction.user.id, now);
                setTimeout(() => timestamps.delete(interaction.user.id), amount);
            } else timestamps.set(interaction.user.id, now);

            await command.execute(interaction, client);
        } catch (e) {
            console.error(e);
            
            return await interaction.reply({ embeds: [new EmbedBuilder().setTitle("Error").setDescription("An error occured while executing this command. Please try again later.").setColor("#FF0000").setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() }).setTimestamp()] });
        };
    }
};