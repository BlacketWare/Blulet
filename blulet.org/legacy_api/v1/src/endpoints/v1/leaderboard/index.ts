import RateLimiter from "../../../middlewares/utils/RateLimiter";
import User from "../../../schema/User";

export default {
    methods: ["get"],
    middlewares: [new RateLimiter({ max: 1, delay: 1000 }).execute()],
    get: async (req, res) => {
        if (!req.session.userId) return res.status(401).json({ error: "You must be logged in to perform this action." });
        const users = await User.find().sort({ tokens: -1 });
        const user = await User.findById(req.session.userId);
        if (!user) return res.status(404).json({ error: "User not found." });

        return res.status(200).json({
            leaderboard: users.slice(0, 10).map((user) => ({
                id: user._id,
                username: user.username,
                tokens: user.tokens,
                avatar: user.avatar,
                color: user.color,
            })),
            me: {
                id: user._id,
                username: user.username,
                tokens: user.tokens,
                avatar: user.avatar,
                color: user.color,
                location: users.findIndex((u) => u.username === user.username) + 1,
            }
        });
    }
};