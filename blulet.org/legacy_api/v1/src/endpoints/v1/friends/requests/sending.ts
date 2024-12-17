import Request from "../../../../schema/Request";
import User from "../../../../schema/User";
import RateLimiter from "../../../../middlewares/utils/RateLimiter";

export default {
    methods: ["get"],
    middlewares: [new RateLimiter({ max: 1, delay: 1000 }).execute()],
    get: async (req, res) => {
        if (!req.session.userId) return res.status(401).json({ error: "You must be logged in to perform this action." });
        const requests = await Request.find({ sender: req.session.userId });
        const users = await Promise.all(requests.map(async request => await User.findById(request.receiver)));

        return res.status(200).json({
            users: users.map(user => ({
                id: user._id,
                username: user.username,
                avatar: user.avatar,
                banner: user.banner,
                color: user.color,
                role: user.role
            }))
        });
    }
};