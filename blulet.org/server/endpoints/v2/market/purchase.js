import jwt from "jsonwebtoken";
import RateLimiter from "#utils/RateLimiter";

export default {
    methods: ["post"],
    middlewares: [new RateLimiter({ max: 1, delay: 750 }).execute()],
    auth: true,
    post: async (req, res) => {
        if (!global.packs || !global.blues) return res.status(400).json({ error: "Cache not loaded" });

        const decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const { pack } = req.body;
        if (!pack) return res.status(400).json({ error: "Missing pack" });

        const fullPack = global.packs[pack];
        if (!fullPack) return res.status(400).json({ error: "Invalid pack" });
        const blues = [];
        const blueIds = [];
        for (const blue of fullPack.blues) blues.push(blue.blue_data.name);
        for (const blue of fullPack.blues) blueIds.push(blue.blue_data.id);

        const user = await global.database.models.User.findOne({ where: { id: decoded.id } });
        if (!user) return res.status(400).json({ error: "Invalid user" });
        const userStats = await global.database.models.UserStat.findOne({ where: { user: user.id } });
        const userBlues = await global.database.models.UserBlue.findAll({ where: { user: user.id } });

        if (user.tokens < fullPack.price) return res.status(400).json({ error: "Not enough tokens" });
        let unlockedBlue = "";
        for (let done = false; !done;) {
            unlockedBlue = blueIds[blueIds.length * Math.random() | 0];
            if (Math.random() * 100 <= fullPack.blues.find(blue => blue.blue_data.id === unlockedBlue).blue_data.chance) done = true;
        }
        let gainedExp = global.rarities[global.blues[unlockedBlue].rarity].exp;
        await global.database.models.User.update({ tokens: user.tokens - fullPack.price, exp: user.exp + gainedExp }, { where: { id: user.id } });
        await global.database.models.UserStat.update({ packs: userStats.packs + 1 }, { where: { user: user.id } });
        await global.database.models.UserBlue.create({ user: user.id, blue: unlockedBlue, sold: false, originalOwner: user.id });

        return res.status(200).json({
            blue: fullPack.blues.find(blue => blue.blue_data.id === unlockedBlue).blue_data.name,
            tokens: user.tokens - fullPack.price,
            exp: user.exp + gainedExp,
            isNew: !userBlues.find(blue => blue.blue === unlockedBlue)
        });
    }
}