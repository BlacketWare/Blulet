import queryString from "querystring";
import User from "../../../../schema/User";
import axios from "axios";

export default {
    methods: ["get"],
    get: async (req, res) => {
        if (!req.query.code) return res.status(400).json({ error: "Invalid Request." });
        if (!req.session.userId) return res.status(401).json({ error: "You must be logged in to perform this action." });
        const { code }: { code: string } = req.query;

        try {
            const response = await axios.post("https://discord.com/api/oauth2/token", queryString.stringify({
                client_id: "1184309062398132304",
                client_secret: process.env.DISCORD_SECRET,
                grant_type: "authorization_code",
                code,
                redirect_uri: `https://blulet.org/api/v1/link/discord/callback`,
                scope: "identify"
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const { access_token } = response.data;
            const userResponse = await axios.get("https://discord.com/api/users/@me", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            const { id } = userResponse.data;

            const user = await User.findOne({ discord: id });
            if (user) return res.status(400).json({ error: "This Discord account is already linked to another account." });

            await User.findByIdAndUpdate(req.session.userId, { discord: id });
            return res.redirect("/settings?linked=true");
        } catch (err) {
            console.error(`[Blulet] [!] Error getting Discord access token. ${err}`);
            return res.status(500).json({ error: "Failed to link your Discord account." });
        };
    }
};