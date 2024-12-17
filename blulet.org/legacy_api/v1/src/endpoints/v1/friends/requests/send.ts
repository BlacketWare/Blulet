import Request from "../../../../schema/Request";
import User from "../../../../schema/User";
import RateLimiter from "../../../../middlewares/utils/RateLimiter";

export default {
    methods: ["post"],
    middlewares: [new RateLimiter({ max: 1, delay: 1000 }).execute()],
    post: async (req, res) => {
        return res.status(400).json({ error: "This endpoint is currently disabled." });
        if (!req.session.userId) return res.status(401).json({ error: "You must be logged in to perform this action." });
        const me = await User.findById(req.session.userId);
        const { receiver }: { receiver: string } = req.body;
        if (!receiver) return res.status(400).json({ error: "You must provide a receiver." });
        
        const request = await Request.findOne({ sender: req.session.userId, receiver });
        if (request) return res.status(400).json({ error: "You have already sent a request to this user." });
        const request2 = await Request.findOne({ sender: receiver, receiver: req.session.userId });
        if (request2) return res.status(400).json({ error: "This user has already sent you a request." });
        if (req.session.userId === receiver) return res.status(400).json({ error: "You cannot send a request to yourself." });
        if (!await User.findById(receiver)) return res.status(400).json({ error: "The user you are trying to send a request to does not exist." });
        if (me.friends.includes(receiver)) return res.status(400).json({ error: "You are already friends with this user." });
        await new Request({ sender: req.session.userId, receiver }).save();
        return res.sendStatus(200);
    }
};