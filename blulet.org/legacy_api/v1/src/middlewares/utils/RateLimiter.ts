import { Request, Response, NextFunction } from 'express';

type Options = {
    max: number;
    delay: number;
};

export default class RateLimiter {
    ipRatelimits: Record<string, Record<string, number>>;
    userRatelimits: Record<string, Record<string, number>>;
    options: Options;

    constructor(options: Options) {
        this.ipRatelimits = {};
        this.userRatelimits = {};
        this.options = options;
    }

    execute() {
        return (req: Request, res: Response, next: NextFunction) => {
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