import RateLimiter from "../../../middlewares/utils/RateLimiter";
import User from "../../../schema/User";
import Message from "../../../schema/Message";
import Room from "../../../schema/Room";

export default {
    methods: ["get"],
    middlewares: [new RateLimiter({ max: 1, delay: 1000 }).execute()],
    get: async (req, res) => {
        if (!req.session.userId) return res.status(401).json({ error: "You must be logged in to perform this action." });
        if (!req.params.room) return res.status(400).json({ error: "You must provide a room." });
        const room = await Room.findOne({ uid: req.params.room });
        if (!room) return res.status(404).json({ error: "The room you requested does not exist." });
        if (!room.access.includes(req.session.userId) && !room.access.includes("public")) return res.status(403).json({ error: "You do not have permission to view this room." });
        const messages = await Message.find({ room: room.uid }).sort({ createdAt: -1 }).limit(50);
        const users = await Promise.all(messages.map(async message => await User.findById(message.author)));
        // if the user doesnt exist, just return null
       
    
        return res.status(200).json({
            messages: messages.map((message, i) => ({
                id: message._id,
                content: message.content,
                author: {
                    id: message.author,
                    username: users[i].username,
                    avatar: users[i].avatar,
                    banner: users[i].banner,
                    color: users[i].color,
                    role: users[i].role,
                    badges: users[i].badges
                },
                room: message.room,
                mentions: message.mentions
            }))
        });
    }
};