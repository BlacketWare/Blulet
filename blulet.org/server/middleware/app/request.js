export default (err, req, res, next) => {
    if (err instanceof SyntaxError) return res.status(400).json({ error: "Invalid JSON data." });
    if (err instanceof Error) return res.status(500).json({ error: err.message });
    if (req.headers["user-agent"]?.includes("axios") || !req.headers["user-agent"]) return res.status(400).json({ error: "Invalid Request." });
    if (!req.headers.referer) return res.status(400).json({ error: "Invalid Request." });
    return next();
};