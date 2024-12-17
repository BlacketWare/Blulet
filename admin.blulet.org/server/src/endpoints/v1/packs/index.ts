import { jwtDecode } from "jwt-decode";
import { Types } from "mongoose";
import Pack from "../../../schema/Pack";

interface Decoded {
    email: string;
    name: string;
}

export default {
    methods: ["get", "delete"],
    get: async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded: Decoded = jwtDecode(token);
        const emails = JSON.parse(process.env.ADMIN_EMAILS || "[]");
        if (!decoded) return res.status(401).json({ error: "Invalid token" });
        if (!emails.includes(decoded.email)) return res.status(401).json({ error: "Invalid token" });

        const name = req.query.name;
        if (!name) return res.status(400).json({ error: "No name or id provided" });

        const pack = await Pack.findOne({ name: { $regex: new RegExp(`^${name.toString()}$`, "i") } });
        if (!pack) return res.status(404).json({ error: "Pack not found" });

        return res.status(200).json(pack);
    },
    delete: async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded: Decoded = jwtDecode(token);
        const emails = JSON.parse(process.env.ADMIN_EMAILS || "[]");
        if (!decoded) return res.status(401).json({ error: "Invalid token" });
        if (!emails.includes(decoded.email)) return res.status(401).json({ error: "Invalid token" });

        const { name }: { name: string } = req.body;
        if (!name) return res.status(400).json({ error: "No name provided" });

        const pack = await Pack.findOne({ name: { $regex: new RegExp(`^${name.toString()}$`, "i") } });
        if (!pack) return res.status(404).json({ error: "Pack not found" });
        await pack.deleteOne();
        
        return res.sendStatus(200);
    }
};