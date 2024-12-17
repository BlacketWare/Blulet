export default class RateLimiter {
    constructor(options) {
        this.ipRatelimits = {};
        this.userRatelimits = {};
        this.options = options;
    }

    execute() {
        return (req, res, next) => {
            if (!this.ipRatelimits[req.path]) this.ipRatelimits[req.path] = {};
            if (!this.userRatelimits[req.path]) this.userRatelimits[req.path] = {};
            if (!this.ipRatelimits[req.path][req.ip]) this.ipRatelimits[req.path][req.ip] = 0;
            if (req.session && req.session.userId && !this.userRatelimits[req.path][req.session.userId]) this.userRatelimits[req.path][req.session.userId] = 0;
            if (this.ipRatelimits[req.path][req.ip] > this.options.max - 1) return res.status(429).json({ retryAfter: this.options.delay });
            if (req.session && req.session.userId && this.userRatelimits[req.path][req.session.userId] > this.options.max - 1) return res.status(429).json({ retryAfter: this.options.delay });

            this.ipRatelimits[req.path][req.ip]++;
            if (req.session && req.session.userId) this.userRatelimits[req.path][req.session.userId]++;

            setTimeout(() => {
                this.ipRatelimits[req.path][req.ip]--;
                if (req.session && req.session.userId) this.userRatelimits[req.path][req.session.userId]--;
            }, this.options.delay);

            next();
        };
    }
};