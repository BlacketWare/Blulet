export default {
    methods: ["delete"],
    middleware: [],
    delete: (req, res) => {
        if (!req.session.userId) return res.status(401).json({ error: "You must be logged in to perform this action." });
        req.session.destroy(() => res.sendStatus(200));
    }
};