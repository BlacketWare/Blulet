import { Types } from "mongoose";
import User from "../../../schema/User";

interface UserResponse {
    user: {
        _id: string;
        username: string;
        avatar: string;
        banner: string;
        discord: string;
        badges: string[];
        blues: { [key: string]: number };
        tokens: number;
        role: string;
        color: string;
        exp: number;
        stats: {
            messages: number;
            packs: number;
        };
        createdAt: Date;
        updatedAt: Date;
    };
}

export default {
    methods: ["get"],
    get: async (req, res) => {
        if (!req.session.userId) return res.status(401).json({ error: "You must be logged in to perform this action." });
        const type = Types.ObjectId.isValid(req.params.user as string) ? "_id" : "username";
        let user: UserResponse["user"];
        if (type === "_id") user = await User.findOne({ _id: req.params.user });
        else user = await User.findOne({ username: new RegExp(`^${req.params.user}$`, "i") });

        return res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                avatar: user.avatar,
                banner: user.banner,
                discord: user.discord,
                badges: user.badges,
                blues: user.blues,
                tokens: user.tokens,
                role: user.role,
                color: user.color,
                exp: user.exp,
                stats: user.stats,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    }
};