import { jwtDecode } from "jwt-decode";
import User from "../../../schema/User";
import Blacklist from "../../../schema/Blacklist";
import Message from "../../../schema/Message";
import Pack from "../../../schema/Pack";
import Blue from "../../../schema/Blue";

interface Decoded {
    email: string;
    name: string;
}

export default {
    methods: ["get"],
    get: async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(400).json({ error: "No token provided" });

        const decoded: Decoded = jwtDecode(token);
        const emails = JSON.parse(process.env.ADMIN_EMAILS || "[]");
        if (!decoded) return res.status(400).json({ error: "Invalid token" });
        if (!emails.includes(decoded.email)) return res.status(400).json({ error: "Invalid token" });

        const users = await User.countDocuments();
        const banned = await User.countDocuments({ "ban.banned": true });
        const blacklisted = await Blacklist.countDocuments();
        const messages = await Message.countDocuments();
        const packs = await Pack.countDocuments();
        const blues = await Blue.countDocuments();

        return res.json({
            users,
            banned,
            blacklisted,
            messages,
            packs,
            blues
        });
    }
};