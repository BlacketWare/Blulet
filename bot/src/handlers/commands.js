import { REST, Routes } from "discord.js";
import chalk from "chalk";

export default async (client) => {
    for await (const file of walk("src/commands")) {
        if (!file.endsWith(".js")) continue;
        try {
            const command = (await import(`../../${file}`)).default;
            client.commands.set(command.data.name, command);
        } catch {
            console.log(chalk.redBright(`[Blulet] [!]`), chalk.whiteBright(`Failed to load command ${file}`));
            continue;
        };
    };

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT, process.env.GUILD), { body: client.commands.map((command) => command.data.toJSON()) }).then(() => console.log(`[Blacket] Loaded ${client.commands.size} commands.`)).catch(console.error);
};