export default {
    methods: ["get"],
    get: async (req, res) => {
        let rarities = global.rarities;
        
        rarities = Object.keys(rarities).map(id => ({
            id: id,
            name: rarities[id].name,
            color: rarities[id].color,
            animation: rarities[id].animation,
            exp: rarities[id].exp,
            waitTime: rarities[id].waitTime
        }));

        return res.status(200).json({ rarities });
    }
}