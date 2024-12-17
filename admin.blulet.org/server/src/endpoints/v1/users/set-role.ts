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

        const { id, role }: { id: string, role: string } = req.body;
        if (!id) return res.status(400).json({ error: "No id provided" });
        if (!role) return res.status(400).json({ error: "No role provided" });

        const fId = new Types.ObjectId(id);
        const user = await User.findOne({ _id: fId });
        if (!user) return res.status(404).json({ error: "User not found" });
        user.role = role;
        await user.save();

        return res.sendStatus(200);
    }
};