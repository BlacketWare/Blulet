import { jwtDecode } from "jwt-decode";
import { Types } from "mongoose";
import User from "../../../schema/User";
import Blacklist from "../../../schema/Blacklist";

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
        
        const username = req.query.username;
        const id = req.query.id;
        if (!username && !id) return res.status(400).json({ error: "No name or id provided" });
        if (username && id) return res.status(400).json({ error: "Cannot provide both name and id" });

        if (username) {
            const user = await User.findOne({ username: { $regex: new RegExp(`^${username.toString()}$`, "i") } });
            if (!user) return res.status(404).json({ error: "User not found" });
            const isBlacklisted = await Blacklist.findOne({ ip: user.ip });
            return res.json({ user, blacklist: { blacklisted: !!isBlacklisted, reason: isBlacklisted?.reason } });
        }

        if (id) {
            const fId = new Types.ObjectId(id.toString());
            const user = await User.findOne({ _id: fId });
            if (!user) return res.status(404).json({ error: "User not found" });
            const isBlacklisted = await Blacklist.findOne({ ip: user.ip });
            return res.json({ user, blacklist: { blacklisted: !!isBlacklisted, reason: isBlacklisted?.reason } });
        }
    },
    delete: async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded: Decoded = jwtDecode(token);
        const emails = JSON.parse(process.env.ADMIN_EMAILS || "[]");
        if (!decoded) return res.status(401).json({ error: "Invalid token" });
        if (!emails.includes(decoded.email)) return res.status(401).json({ error: "Invalid token" });

        const { id }: { id: string } = req.body;
        if (!id) return res.status(400).json({ error: "No id provided" });
        
        const fId = new Types.ObjectId(id);
        const user = await User.findOne({ _id: fId });
        if (!user) return res.status(404).json({ error: "User not found" });
        await user.deleteOne();
        return res.sendStatus(200);
    }
};