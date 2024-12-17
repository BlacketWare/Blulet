import { jwtDecode } from "jwt-decode";
import { Types } from "mongoose";
import User from "../../../schema/User";
import Blacklist from "../../../schema/Blacklist";

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

        const { id, blacklisted, reason }: { id: string, blacklisted: boolean, reason: string } = req.body;
        if (!id) return res.status(400).json({ error: "No id provided" });

        const fId = new Types.ObjectId(id);
        const user = await User.findById(fId);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (blacklisted) {
            if (!reason) return res.status(400).json({ error: "No reason provided" });
            const blacklist = new Blacklist({ ip: user.ip, reason });
            await blacklist.save();
        };
        if (!blacklisted) {
            const blacklist = await Blacklist.findOne({ ip: user.ip });
            if (!blacklist) return res.status(404).json({ error: "User not blacklisted" });
            await blacklist.deleteOne();
        };

        return res.sendStatus(200);
    }
};