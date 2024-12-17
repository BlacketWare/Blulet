import jwt from "jsonwebtoken";
import RateLimiter from "#utils/RateLimiter";

export default {
    methods: ["post"],
    middlewares: [new RateLimiter({ max: 1, delay: 750 }).execute()],
    post: async (req, res) => {
        const { blue, amount } = req.body;
        const blues = global.blues;
        const decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const user = await global.database.models.User.findOne({
            where: { id: decoded.id },
            include: [{
                model: global.database.models.UserBlue,
                as: "blues",
                attributes: ["id", "blue", "sold"],
                include: [{
                    model: global.database.models.Blue,
                    as: "blue_data"
                }]
            }]
        }).catch(undefined);

    }
}