import { jwtDecode } from "jwt-decode";

interface Decoded {
    email: string;
    name: string;
}

export default {
    methods: ["get"],
    get: async (req, res) => {
        const token = req.headers.authorization?.split(" ")[1];
        const emails = JSON.parse(process.env.ADMIN_EMAILS || "[]");
        if (!token) return res.status(400).json({ error: "No token provided" });

        const decoded: Decoded = jwtDecode(token);
        if (!decoded) return res.status(400).json({ error: "Invalid token" });
        if (!emails.includes(decoded.email)) return res.status(400).json({ error: "Invalid token" });

        return res.sendStatus(200);
    }
};