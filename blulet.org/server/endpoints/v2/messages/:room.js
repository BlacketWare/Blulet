export default {
    methods: ["get"],
    auth: true,
    get: async (req, res) => {
        if (!req.params.room) return res.status(400).json({ error: "Invalid room" });
        const room = await global.database.models.Room.findOne({
            where: {
                id: req.params.room
            },
            include: [
                {
                    model: global.database.models.Message,
                    as: "messages",
                    limit: 50,
                    order: [["id", "DESC"]],
                    include: [
                        {
                            model: global.database.models.User,
                            as: "author_data",
                            attributes: ["id", "username", "avatar", "banner", "color", "role"]
                        }
                    ]
                }
            ]
        }).catch(undefined);
        if (!room) return res.status(404).json({ error: "Room not found" });
        const messages = [];
        for (const message of room.messages) {
            messages.push({
                id: message.id,
                content: message.content,
                author: {
                    id: message.author_data.id,
                    username: message.author_data.username,
                    avatar: message.author_data.avatar,
                    banner: message.author_data.banner,
                    color: message.author_data.color,
                    role: message.author_data.role
                },
                room: message.room,
                mentions: message.mentions
            });
        }
        
        return res.status(200).json({ messages });
    }
};