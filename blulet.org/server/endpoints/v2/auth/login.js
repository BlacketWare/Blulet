import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RateLimiter from "#utils/RateLimiter";
import axios from "axios";

export default {
    methods: ["post"],
    middlewares: [new RateLimiter({ max: 1, delay: 750 }).execute()],
    post: async (req, res) => {
        const { username, password, token } = req.body;
        const user = await global.database.models.User.findOne({ where: { username } });
        if (!user) return res.status(400).json({ error: "The username or password you provided is invalid." });
        if (!username) return res.status(400).json({ error: "You must provide a username." });
        if (!password) return res.status(400).json({ error: "You must provide a password." });
        if (!token) return res.status(400).json({ error: "You must complete the captcha to continue." });
        const captcha = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`).then(res => res.data).catch(() => ({ success: true }));
        if (!captcha.success) return res.status(400).json({ error: "The captcha you provided is invalid." });
        if (!bcrypt.compareSync(password, user.password)) return res.status(400).json({ error: "The username or password you provided is invalid." });

        const userToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({ token: userToken });
    }
}