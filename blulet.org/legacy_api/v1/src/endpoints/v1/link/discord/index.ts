import RateLimiter from "../../../../middlewares/utils/RateLimiter";
import User from "../../../../schema/User";

export default {
    methods: ["get", "delete"],
    middlewares: [new RateLimiter({ max: 1, delay: 1000 }).execute()],
    get: async (req, res) => {
        const clientId = "1184309062398132304";
        const redirectUri = encodeURIComponent(`https://blulet.org/api/v1/link/discord/callback`);
        const scope = encodeURIComponent("identify");
        const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

        return res.redirect(authUrl);
    },
    delete: async (req, res) => {
        if (!req.session.userId) return res.status(400).json({ error: "You are not logged in." });
        const user = await User.findOne({ _id: req.session.userId });
        if (!user) return res.status(400).json({ error: "You are not logged in." });
        if (!user.discord) return res.status(400).json({ error: "You have not linked your Discord account." });
        user.discord = "";
        await user.save();

        return res.sendStatus(200);
    }
};