import RateLimiter from "../../../middlewares/utils/RateLimiter";
import User from "../../../schema/User";
import Pack from "../../../schema/Pack";
import Blue from "../../../schema/Blue";
import Rarity from "../../../schema/Rarity";

export default {
    methods: ["post"],
    middlewares: [new RateLimiter({ max: 1, delay: 500 }).execute()],
    post: async (req, res) => {
        if (!req.session.userId) return res.status(401).json({ error: "You must be logged in to perform this action." });
        const { pack }: { pack: string } = req.body;
        if (!pack) return res.status(400).json({ error: "You must provide a pack." });
        const me = await User.findById(req.session.userId);
        const sPack = await Pack.findOne({ name: pack });
        if (!sPack) return res.status(404).json({ error: "The pack you requested does not exist." });
        const sBlues = await Blue.find({ name: { $in: sPack.blues } });
        const sRarities = await Rarity.find();
        const price = sPack.price;
        if (me.tokens < price) return res.status(403).json({ error: "You do not have enough tokens to purchase this pack." });
        let blues = [];
        for (let blue of sBlues) blues.push(blue.name);

        let unlockedBlue = "";
        for (let done = false; !done;) {
            unlockedBlue = blues[blues.length * Math.random() | 0];
            if (Math.random() * 100 <= sBlues.find(blue => blue.name === unlockedBlue).chance) done = true;
        };

        /*const sortedBlues = sBlues.sort((a, b) => b.chance - a.chance);
        const highestChanceBlue = sortedBlues[0];

        const rolledNumber: number = Math.random() * highestChanceBlue.chance;

        const unlockedBlue: string = blues.reduce((prev, curr) => {
            const prevChance: number = sBlues.find(blue => blue.name === prev).chance;
            const currChance: number = sBlues.find(blue => blue.name === curr).chance;
            if (Math.abs(currChance - rolledNumber) < Math.abs(prevChance - rolledNumber)) return curr;
            else if (Math.abs(currChance - rolledNumber) === Math.abs(prevChance - rolledNumber)) {
                const sameChanceBlues: string[] = blues.filter(blue => sBlues.find(b => b.name === blue).chance === currChance);
                return sameChanceBlues[sameChanceBlues.length * Math.random() | 0];
            } else return prev;
        });*/

        let gainedExp = sRarities.find(rarity => rarity.name === sBlues.find(blue => blue.name === unlockedBlue).rarity).exp;
        let isNew = true;
        if (me.blues[unlockedBlue]) {
            gainedExp = gainedExp / 2;
            isNew = false;
        };
        await User.updateOne({ _id: req.session.userId }, { $inc: { tokens: -price, exp: gainedExp, "stats.packs": 1 } });
        if (me.blues[unlockedBlue] || me.blues[unlockedBlue] > 0) me.blues[unlockedBlue] += 1;
        else me.blues[unlockedBlue] = 1;
        me.markModified("blues");
        await me.save();

        return res.status(200).json({
            blue: unlockedBlue,
            tokens: me.tokens - price,
            exp: me.exp,
            isNew
        });
    }
};