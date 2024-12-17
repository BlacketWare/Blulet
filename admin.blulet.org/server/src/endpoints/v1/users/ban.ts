import { jwtDecode } from "jwt-decode";
import { Types } from "mongoose";
import User from "../../../schema/User";

interface Decoded {
    email: string;
    name: string;
}

export default {
    methods: ["put"],
    put: async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded: Decoded = jwtDecode(token);
        const emails = JSON.parse(process.env.ADMIN_EMAILS || "[]");
        if (!decoded) return res.status(401).json({ error: "Invalid token" });
        if (!emails.includes(decoded.email)) return res.status(401).json({ error: "Invalid token" });

        const { id, banned, reason, until }: { id: string, banned: boolean, reason: string, until: number } = req.body;
        if (!id) return res.status(400).json({ error: "No id provided" });

        const fId = new Types.ObjectId(id);
        const user = await User.findById(fId);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (banned) {
            if (!until) return res.status(400).json({ error: "No until provided" });
            if (!reason) return res.status(400).json({ error: "No reason provided" });
            user.ban = { banned: true, reason, until, staff: null };
        };
        if (!banned) user.ban = { banned: false, reason: null, until: null, staff: null };

        user.markModified("ban");
        await user.save();

        return res.sendStatus(200);
    }
};