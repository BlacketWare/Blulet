export default (userBadges) => {
    let badges = "";
    if (userBadges.length > 0) Object.keys(global.config.badges).forEach(badge => {
        (userBadges.includes(badge) || userBadges.includes("*"))
        badges += `${global.config.badges[badge]} `;
    }); else badges = "None";

    return badges;
};