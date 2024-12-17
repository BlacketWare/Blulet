type Options = {
    max: number;
    delay: number;
};

export default class WebSocketRateLimiter {
    userRatelimits: Record<string, number>;
    options: Options;

    constructor(options: Options) {
        this.userRatelimits = {};
        this.options = options;
    }

    execute(userId: string): boolean {
        if (!this.userRatelimits[userId]) this.userRatelimits[userId] = 0;
        if (this.userRatelimits[userId] > this.options.max - 1) return true;

        this.userRatelimits[userId]++;
        setTimeout(() => {
            this.userRatelimits[userId]--;
        }, this.options.delay);

        return false;
    }
}
