import console from "#functions/console";

export default async () => {
    global.packs = {};
    global.blues = {};
    global.rarities = {};

    const packs = await global.database.models.Pack.findAll({
        attributes: ["id", "name", "price", "colors", "image"],
        include: [{
            model: global.database.models.PackBlue,
            as: "blues",
            attributes: ["id", "blue"],
            include: [{
                model: global.database.models.Blue,
                as: "blue_data"
            }]
        }]
    });

    for (const pack of packs) {
        global.packs[pack.id] = {
            name: pack.name,
            price: pack.price,
            colors: pack.colors,
            image: pack.image,
            blues: pack.blues
        };
    }

    const blues = await global.database.models.Blue.findAll();
    for (const blue of blues) {
        global.blues[blue.id] = {
            name: blue.name,
            rarity: blue.rarity,
            price: blue.price,
            chance: blue.chance,
            image: blue.image,
            background: blue.background
        };
    }

    const rarities = await global.database.models.Rarity.findAll();
    for (const rarity of rarities) {
        global.rarities[rarity.name] = {
            name: rarity.name,
            color: rarity.color,
            animation: rarity.animation,
            exp: rarity.exp,
            waitTime: rarity.waitTime
        };
    }

    console.success("Cache loaded");
}