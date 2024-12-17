import jwt from "jsonwebtoken";

export default {
    methods: ["get"],
    auth: true,
    get: async (req, res) => {
        const decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        let user = await global.database.models.User.findOne({
            where: { id: decoded.id },
            attributes: ["id", "username", "avatar", "banner", "tokens", "exp", "role", "color", "createdAt", "claimedAt"],
            include: [{
                model: global.database.models.UserBlue,
                as: "blues",
                attributes: ["id", "blue", "sold"],
                include: [{
                    model: global.database.models.Blue,
                    as: "blue_data"
                }]
            },
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
            }]
        });
        if (!user) return res.status(401).json({ error: "An invalid JWT token was provided in the request." });

        const blues = {};
        const badges = [];

        for (const blue of user.blues) {
            if (blue.sold) continue;
            if (blues[blue.blue_data.name]) blues[blue.blue_data.name]++;
            else blues[blue.blue_data.name] = 1;
        }
        
        for (const badge of user.badges) badges.push(badge.badge_data.name);

        user = user.toJSON();
        user.stats = user.stats[0];
        user.badges = badges;
        user.blues = blues;

        return res.status(200).json({ user });
    }
}