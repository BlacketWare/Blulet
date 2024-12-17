import Blue from "../../../schema/Blue";

export default {
    methods: ["get"],
    get: async (_, res) => {
        const blues = await Blue.find();

        return res.status(200).json({
            blues: blues.map(blue => ({
                id: blue._id,
                name: blue.name,
                rarity: blue.rarity,
                price: blue.price,
                chance: blue.chance,
                image: blue.image,
                background: blue.background
            }))
        });
    }
};