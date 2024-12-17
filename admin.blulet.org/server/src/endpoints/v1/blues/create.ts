import { jwtDecode } from "jwt-decode";
import { Types } from "mongoose";
import Blue from "../../../schema/Blue";

interface Decoded {
    email: string;
    name: string;
}

export default {
    methods: ["post"],
    post: async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded: Decoded = jwtDecode(token);
        const emails = JSON.parse(process.env.ADMIN_EMAILS || "[]");
        if (!decoded) return res.status(401).json({ error: "Invalid token" });
        if (!emails.includes(decoded.email)) return res.status(401).json({ error: "Invalid token" });

        const { name, rarity, price, chance, image, background }: { name: string, rarity: string, price: number, chance: number, image: string, background: string } = req.body;
        if (!name) return res.status(400).json({ error: "No name provided" });
        if (!rarity) return res.status(400).json({ error: "No rarity provided" });
        if (!price) return res.status(400).json({ error: "No price provided" });
        if (!chance) return res.status(400).json({ error: "No chance provided" });
        if (!image) return res.status(400).json({ error: "No image provided" });
        if (!background) return res.status(400).json({ error: "No background provided" });

        const blueName = await Blue.findOne({ name });
        if (blueName) return res.status(400).json({ error: "Blue name already exists" });

        const blue = new Blue({
            name,
            rarity,
            price,
            chance,
            image,
            background
        });
        await blue.save();

        return res.sendStatus(200);
    }
};