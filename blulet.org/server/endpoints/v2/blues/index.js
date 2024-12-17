export default {
    methods: ["get"],
    get: async (req, res) => {
        // const blues = await global.database.models.Blue.findAll();
        // res.status(200).json({
        //     blues: blues.map(blue => ({
        //         id: blue.id,
        //         name: blue.name,
        //         rarity: blue.rarity,
        //         price: blue.price,
        //         chance: blue.chance,
        //         image: blue.image,
        //         background: blue.background
        //     }))
        // });
        const blues = global.blues;
        res.status(200).json({
            blues: Object.keys(blues).map(id => ({
                id: id,
                name: blues[id].name,
                rarity: blues[id].rarity,
                price: blues[id].price,
                chance: blues[id].chance,
                image: blues[id].image,
                background: blues[id].background
            }))
        });
    }
}