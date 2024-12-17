import jwt from "jsonwebtoken";

export default {
    methods: ["get"],
    auth: true,
    get: async (req, res) => {
        const decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const users = await global.database.models.User.findAll({
            attributes: ["id", "username", "avatar", "banner", "tokens", "exp", "role", "color", "createdAt"],
            order: [["tokens", "DESC"]],
            limit: 10
        });

        let me = await global.database.models.User.findOne({
            where: { id: decoded.id },
            attributes: ["id", "username", "avatar", "banner", "tokens", "exp", "role", "color", "createdAt"],
            order: [["tokens", "DESC"]]
        });

        let position = 0;
        for (const user of users) {
            position++;
            if (user.id === me.id) break;
        }

        me = me.toJSON();
        me.position = position;
        
        res.status(200).json({ leaderboard: users, me });

    }
}