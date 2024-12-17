import User from "../../../schema/User";
import RateLimiter from "../../../middlewares/utils/RateLimiter";

export default {
    methods: ["get"],
    middlewares: [new RateLimiter({ max: 1, delay: 1000 }).execute()],
    get: async (req, res) => {
        if (!req.session.userId) return res.status(401).json({ error: "You must be logged in to perform this action." });
        const user = await User.findById(req.session.userId);
        if (!user) return res.status(401).json({ error: "You must be logged in to perform this action." });
        let friends = await Promise.all(user.friends.map(async (friend) => {
            const info = await User.findById(friend);
            if (!info) return;
            return {
                id: info._id,
                username: info.username,
                avatar: info.avatar,
                banner: info.banner,
                color: info.color,
                role: info.role,
            };
        }));
        friends = friends.filter((friend) => friend !== undefined);
        friends.sort((a, b) => a.username.localeCompare(b.username));
        return res.status(200).json({ friends });
    }
};