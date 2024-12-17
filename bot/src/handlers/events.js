export default async (client) => {
    for await (const file of global.walk("src/events")) {
        if (!file.endsWith(".js")) continue;
        const event = (await import(`../../${file}`)).default;
        if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
        else client.on(event.name, (...args) => event.execute(...args, client));
    };
};