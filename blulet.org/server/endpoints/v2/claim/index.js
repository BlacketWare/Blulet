import jwt from "jsonwebtoken";

export default {
    methods: ["get"],
    auth: true,
    get: async (req, res) => {
        const decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const user = await global.database.models.User.findOne({ where: { id: decoded.id } });
        if (!user) return res.status(400).json({ error: "Invalid user" });
        if (user.claimedAt >= (new Date).setUTCHours(0, 0, 0, 0)) return res.status(400).json({ error: "Already claimed" });

        const rewards = [
            500,
            550,
            600,
            650,
            700,
            800,
            900,
            1000,
        ]
        let [index, distribution] = [0, 0];
        const random = Math.floor(Math.random() * 100);

        if (random <= (distribution += 30)) index = 1;
        else if (random < (distribution += 23)) index = 2;
        else if (random < (distribution += 22)) index = 3;
        else if (random < (distribution += 20)) index = 4;
        else if (random < (distribution += 15)) index = 5;
        else if (random < (distribution += 10)) index = 6;
        else if (random < (distribution += 7)) index = 7;
        else if (random < (distribution += 5)) index = 8;

        await global.database.models.User.update({ tokens: user.tokens + rewards[index - 1], claimedAt: Date.now() }, { where: { id: user.id } });

        return res.status(200).json({ reward: index });
    }
}