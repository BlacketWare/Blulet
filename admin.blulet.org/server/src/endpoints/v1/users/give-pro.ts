import  { jwtDecode } from "jwt-decode";
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

        const { id }: { id: string } = req.body;
        if (!id) return res.status(400).json({ error: "No id provided" });

        const fId = new Types.ObjectId(id);
        const user = await User.findOne({ _id: fId });
        if (!user) return res.status(404).json({ error: "User not found" });
        if (user.role === "Pro") return res.status(400).json({ error: "User is already Pro" });
        if (user.role === "Common") user.role = "Pro";
        if (!user.perms.includes("*") && !user.perms.includes("pro_perms")) user.perms = [...user.perms, "pro_perms"];
        if (!user.badges.includes("*") && !user.badges.includes("Pro")) user.badges.push("Pro");
        await user.save();

        return res.sendStatus(200);
    }
};