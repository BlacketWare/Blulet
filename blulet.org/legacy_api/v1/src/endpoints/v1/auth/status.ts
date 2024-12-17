import Blacklist from "../../../schema/Blacklist";

export default {
    methods: ["get"],
    get: async (req, res) => {
        const blacklist = await Blacklist.findOne({ ip: req.ip });
        if (blacklist) return res.status(403).json({ error: `You are currently blacklisted from Blulet for ${blacklist.reason}. If you believe this to be a mistake, please contact monkxy on Discord.` });
        return res.sendStatus(200);
    }
};