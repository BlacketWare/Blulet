export default {
    name: "send-message",
    execute: async (socket, message) => {
        if (!message.content) return socket.send(JSON.stringify({ event: "send-message", error: "Invalid content" }));
        if (!message.room) return socket.send(JSON.stringify({ event: "send-message", error: "Invalid room" }));
        if (!message.content.length) return socket.send(JSON.stringify({ event: "send-message", error: "Invalid content" }));
        if (message.content.length > 2000) return socket.send(JSON.stringify({ event: "send-message", error: "Content too long" }));
        const room = await global.database.models.Room.findOne({ where: { id: message.room } }).catch(undefined);
        if (!room) return socket.send(JSON.stringify({ event: "send-message", error: "Room not found" }));
        if (!room.access.includes("public") && !room.access.includes(socket.user)) return socket.send(JSON.stringify({ event: "send-message", error: "Unauthorized" }));
        const mentions = message.content.match(/<@!?\d{17,19}>/g);
        const content = message.content.replace(/<@!?\d{17,19}>/g, "");
        const msg = await global.database.models.Message.create({
            content,
            author: socket.user,
            room: message.room,
            mentions: mentions || [],
            edits: [],
            deleted: false
        }).catch(undefined);
        if (!msg) return socket.send(JSON.stringify({ event: "send-message", error: "Failed to create message" }));

        const author = await global.database.models.User.findOne({
            where: { id: socket.user },
            include: [
                {
                    model: global.database.models.UserBadge,
                    as: "badges",
                    attributes: ["id", "badge"],
                    include: [{
                        model: global.database.models.Badge,
                        as: "badge_data"
                    }]
                },
                {
                    model: global.database.models.UserStat,
                    as: "stats",
                    attributes: ["messages", "packs"]
                }
            ]
        }).catch(undefined);
        if (!author) return socket.send(JSON.stringify({ event: "send-message", error: "Failed to find author" }));

        await global.database.models.User.update({ exp: author.exp + Math.floor(Math.random() * 10) + 5, tokens: author.tokens + Math.floor(Math.random() * 5) + 1 }, { where: { id: author.id } });
        await global.database.models.UserStat.update({ messages: author.stats[0].messages + 1 }, { where: { user: author.id } });
        const badges = [];
        for (const badge of author.badges) badges.push(badge.badge_data.name);

        for (const client of Object.values(global.clients)) {
            client.send(JSON.stringify({
                event: "message-received",
                message: {
                    id: msg.id,
                    content: msg.content,
                    author: {
                        id: author.id,
                        username: author.username,
                        avatar: author.avatar,
                        banner: author.banner,
                        color: author.color,
                        role: author.role,
                        badges
                    },
                    room: msg.room,
                    mentions: msg.mentions
                }
            }));
        }
    }
}