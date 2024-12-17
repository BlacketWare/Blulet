import User from "../../../schema/User";

export default {
    methods: ["get"],
    get: async (req, res) => {
        if (!req.session.userId) return res.status(401).json({ error: "You must be logged in to perform this action." });
        const user = await User.findOne({ _id: req.session.userId });
        if (!user) return res.status(404).json({ error: "The user you requested does not exist." });
        return res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                avatar: user.avatar,
                banner: user.banner,
                discord: user.discord,
                badges: user.badges, 
                blues: user.blues,
                tokens: user.tokens,
                perms: user.perms,
                role: user.role,
                color: user.color,
                exp: user.exp,
                inventory: user.inventory,
                stats: user.stats,
                friends: user.friends,
                blocks: user.blocks,
                claimed: user.claimed,
                settings: user.settings,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    }
};
