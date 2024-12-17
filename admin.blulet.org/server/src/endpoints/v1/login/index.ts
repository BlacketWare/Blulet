import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";

interface Decoded {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    nbf: number;
    name: string;
    picture: string;
    given_name: string;
    locale: string;
    iat: number;
    exp: number;
    jti: string;
}

export default {
    methods: ["post"],
    post: async (req, res) => {
        const { token }: { token: string } = req.body;
        if (!token) return res.status(400).json({ error: "No token provided" });

        const decoded: Decoded = jwtDecode(token);
        const emails = JSON.parse(process.env.ADMIN_EMAILS || "[]");
        if (!decoded) return res.status(400).json({ error: "Invalid token" });
        if (!emails.includes(decoded.email)) return res.status(400).json({ error: "Invalid token" });
        const signedToken = jwt.sign({ email: decoded.email, name: decoded.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ signedToken });
    }
};