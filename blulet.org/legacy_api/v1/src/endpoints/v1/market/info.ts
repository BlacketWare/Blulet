import Pack from "../../../schema/Pack";

export default {
    methods: ["get"],
    get: async (_, res) => {
        const packs = await Pack.find();
        return res.status(200).json({
            packs: packs.map(pack => ({
                id: pack._id,
                name: pack.name,
                price: pack.price,
                colors: pack.colors,
                blues: pack.blues,
                image: pack.image
            }))
        });
    }
}