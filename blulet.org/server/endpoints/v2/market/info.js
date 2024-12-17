export default {
    methods: ["get"],
    get: async (req, res) => {
        if (!global.packs || !global.blues) return res.status(400).json({ error: "Cache not loaded" });

        let packs = global.packs;
        let blues = [];
        let packBlues = {};
        for (const pack of Object.keys(packs)) {
            blues = [];
            for (const blue of packs[pack].blues) blues.push(blue.blue_data.name);
            packBlues[pack] = blues;
        }

        packs = Object.keys(packs).map(id => ({
            id: id,
            name: packs[id].name,
            price: packs[id].price,
            colors: packs[id].colors,
            image: packs[id].image,
            blues: packBlues[id] 
        }));

        res.status(200).json({ packs });
    }
}