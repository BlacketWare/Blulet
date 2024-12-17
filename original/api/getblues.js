const ValuesnCapsules = require("./opencapsule.js").ValuesnCapsules;

const sendblues = (req,res,next) => {
    res.json({
        ValuesnCapsules
    })
}

module.exports = {
    sendblues,
}