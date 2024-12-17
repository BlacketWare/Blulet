import RateLimiter from "../../../middlewares/utils/RateLimiter";
import VpnChecker from "../../../middlewares/utils/VpnChecker";
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
        const { username, password, checked, token }: { username: string, password: string, checked: boolean, token: string } = req.body;
        if (!checked) return res.status(400).json({ error: "You must accept the Terms of Service and Privacy Policy." });
        if (req.session.userId) return res.status(400).json({ error: "You are already logged in." });
        if (!username || !password) return res.status(400).json({ error: "You must provide a username and password." });
        const captcha = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`).then(res => res.data as CaptchaResponse);
        if (!captcha.success) return res.status(400).json({ error: "You must complete the captcha." });
        if (!await VpnChecker.execute(req.ip)) return res.status(400).json({ error: "You cannot create an account while using a VPN." });
        if (username.length < 3 || username.length > 20) return res.status(400).json({ error: "Your username must be between 3 and 20 characters." });
        if (username.match(/[^a-zA-Z0-9._-]/g)) return res.status(400).json({ error: "Your username can only contain letters, numbers, periods, underscores, and dashes." });
        const ip = await User.findOne({ ip: req.ip });
        if (ip) return res.status(400).json({ error: "You have already created an account." });
        const user = await User.findOne({ username: { $regex: new RegExp(`^${username.toString()}$`, "i") } });
        if (user) return res.status(400).json({ error: "The username you provided is already taken." });

        const newUser = new User({
            username,
            password: await bcrypt.hash(password, 10),
            avatar: "Default",
            banner: "default",
            discord: "",
            badges: [],
            blues: {  },
            tokens: 250,
            perms: [],
            role: "Common",
            color: "#ffffff",
            exp: 0,
            inventory: [],
            stats: {
                messages: 0,
                packs: 0
            },
            friends: [],
            blocks: [],
            ip: req.ip,
            claimed: 0,
            settings: {
                notifications: true,
                friends: 1,
                trades: 1
            },
            otp: {
                enabled: false,
                secret: ""
            },
            mute: {
                muted: false,
                reason: null,
                until: null
            },
            ban: {
                banned: false,
                reason: null,
                until: null
            }
        });
        await newUser.save();

        req.session.userId = newUser._id.toString();
        req.session.save();
        return res.sendStatus(200);
    }
};