export default (exp) => {
    let level = 0;
    for (let i = 0; i <= 27915; i++) {
        let needed = 5 * Math.pow(level, 0.75) * level;
        if (exp >= needed) {
            exp -= needed;
            level++;
        };
    };

    return level;
};