import RateLimiter from "../../../middlewares/utils/RateLimiter";
import axios from "axios";
import bcrypt from "bcrypt";
import User from "../../../schema/User";

type CaptchaResponse = {
    success: boolean;
    challenge_ts: string;
    hostname: string;
    "error-codes": string[];
};

export default {
    methods: ["post"],
    middlewares: [new RateLimiter({ max: 1, delay: 1000 }).execute()],
    post: async (req, res) => {
        const { username, password, token }: { username: string, password: string, token: string } = req.body;
        if (req.session.userId) return res.status(400).json({ error: "You are already logged in." });
        if (!username || !password) return res.status(400).json({ error: "You must provide a username and password." });
        const captcha = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`).then(res => res.data as CaptchaResponse).catch(() => ({ success: true }));
        if (!captcha.success) return res.status(400).json({ error: "You must complete the captcha." });
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: "The username or password you provided is incorrect." });
        if (!await bcrypt.compare(password, user.password as string)) return res.status(404).json({ error: "The username or password you provided is incorrect." });
        if (user.ban.banned) return res.status(403).json({ error: `You are currently banned for ${user.ban.reason}. This ban will expire on ${new Date(user.ban.until).toLocaleString()}.` });
        await User.updateOne({ _id: user._id }, { $set: { ip: req.ip } });
        
        req.session.userId = user._id.toString();
        req.session.save();
        return res.sendStatus(200);
    }
}