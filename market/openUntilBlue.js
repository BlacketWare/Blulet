(async () => {
    if (!window.ac?.market?.getPacks) return alert(`This script has been patched, open an issue.\nhttps://github.com/BlacketWare/Blulet`);

    let packs = await ac.market.getPacks();
    let blues = await ac.market.getBlues();
    let rarities = await ac.rarities.getRarities();
    let me = (await ac.user.getUser()).data.user;

    let target = prompt('Enter a Blue to target:');
    if (!blues.find(b => b.name === target)) return alert('I can\'t find that Blue.');
    let pack = packs.find(pack => pack.blues.includes(target));
    if (!pack) return alert(`That Blue doesn't have a pack.`);
    
    let limit = prompt('Enter a limit (how many packs to try for before you fully stop, no matter if you get).\nEnter * for no limit.');
    if (limit.toString() === '*') limit = Math.floor(me.tokens / pack.price);
    if (isNaN(limit) || limit < 0) return alert('Invalid limit.');
    if (limit < 1 || limit * pack.price > me.tokens) return alert('You do not have enough tokens.');
    
    let speed = Number.parseInt(prompt('What speed (in ms) would you like this to open at?\nOur current recommendation is around 750.'));
    if (isNaN(speed)) return alert('Invalid speed.');
    if (speed < 600) return alert('The script speed should be above 600 to avoid a large ratelimit.');

    let unlockedBlues = [];
    let i = 0;
    let unlocked = false;

    const buy = async () => {
        await ac.market.purchasePack(pack.name).then((data) => {
            if (data.error) return console.log(`Error opening`, data);
            i++;
            console.log('%c%s', `color: ${rarities.find(r => r.name === blues.find(b => b.name === data.blue).rarity).color}; font-size: 25px; padding: 10px 0 15px 20px;`, data.blue);
            if (data.blue === target) return unlocked = true;
            unlockedBlues.push(data.blue);
        }).catch((err) => {
            if (err?.request?.status == 401) location.href = '/login';
            else if (err?.request.status === 429) console.log('%c%s', `color: black; font-size: 15px; padding: 10px 0 15px 20px;`, `Ratelimited!`);
            else console.log(`Unknown error. Report this on Github.`, err);
        });
    };

    let buyInt = setInterval(() => {
        if (!unlocked && i < limit) buy();
        else {
            clearInterval(buyInt);
            let count = {};
            unlockedBlues.forEach(blue => count[blue] = (count[blue] || 0) + 1);
            if (unlocked) alert(`Unlocked ${target} in ${i} boxes...\n\nOther Unlocks:\n` + Object.entries(count).map((x) => `    ${x[1]} ${x[0]}`).join(`\n`));
            else alert(`Failed to unlock ${target} in ${i} boxes...\n\Unlocks:\n` + Object.entries(count).map((x) => `    ${x[1]} ${x[0]}`).join(`\n`));
        };
    }, speed);
})();
