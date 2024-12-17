import Rarity from "../../../schema/Rarity";

export default {
    methods: ["get"],
    get: async (_, res) => {
        const rarities = await Rarity.find();

        return res.status(200).json({
            rarities: rarities.map(rarity => ({
                id: rarity._id,
                name: rarity.name,
                color: rarity.color,
                animation: rarity.animation,
                exp: rarity.exp,
                waitTime: rarity.waitTime
            }))
        });
    }
};