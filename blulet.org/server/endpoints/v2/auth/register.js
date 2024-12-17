import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import RateLimiter from "#utils/RateLimiter";
import axios from "axios";

export default {
    methods: ["post"],
    middlewares: [new RateLimiter({ max: 1, delay: 750 }).execute()],
    post: async (req, res) => {
        const { username, password, token } = req.body;
        const user = await global.database.models.User.findOne({ where: { username } });
        const ip = await global.database.models.User.findOne({ where: { ip: req.ip } });
        if (user) return res.status(400).json({ error: "The username you provided is already in use." });
        if (ip) return res.status(400).json({ error: "You have already registered an account." });
        if (!token) return res.status(400).json({ error: "You must complete the captcha to continue." });
        const captcha = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`).then(res => res.data).catch(() => ({ success: true }));
        if (!captcha.success) return res.status(400).json({ error: "The captcha you provided is invalid." });
        if (!username) return res.status(400).json({ error: "You must provide a username." });
        if (!password) return res.status(400).json({ error: "You must provide a password." });
        if (username.length < 3) return res.status(400).json({ error: "Your username must be at least 3 characters long." });
        if (username.length > 16) return res.status(400).json({ error: "Your username must be less than 16 characters long." });
        // can i add username filter yeah i forgot the regex check legacy api/v1

        const newUser = await new global.database.models.User({
            username,
            password: bcrypt.hashSync(password, 10),
            avatar: "https://media.blulet.org/blues/Default.svg",
            banner: "https://media.blulet.org/banners/default.svg",
            tokens: 500,
            exp: 0,
            role: "Common",
            color: "#ffffff",
            ip: req.ip,
            claimedAt: "0",
            createdAt: Date.now(),
            lastlogin: Date.now()
        }).save();

        new global.database.models.UserStat({
            user: newUser.id,
            messages: 0,
            packs: 0
        }).save();

        const userToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({ token: userToken });
    }
}