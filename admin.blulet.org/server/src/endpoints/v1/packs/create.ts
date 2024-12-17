import { jwtDecode } from "jwt-decode";
import { Types } from "mongoose";
import Pack from "../../../schema/Pack";

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

        const { name, price, colors, blues, image }: { name: string, price: number, colors: string[], blues: string[], image: string } = req.body;
        if (!name) return res.status(400).json({ error: "No name provided" });
        if (!price) return res.status(400).json({ error: "No price provided" });
        if (!colors) return res.status(400).json({ error: "No colors provided" });
        if (!blues) return res.status(400).json({ error: "No blues provided" });
        if (!image) return res.status(400).json({ error: "No image provided" });
        const packName = await Pack.findOne({ name });
        if (packName) return res.status(400).json({ error: "Pack name already exists" });

        const pack = new Pack({
            name,
            price,
            colors,
            blues,
            image
        });
        await pack.save();

        return res.sendStatus(200);
    }
};