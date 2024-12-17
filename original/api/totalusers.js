const User = require('../models/User');

const totaluser = (req,res,next) => {
    if (req.body.accesstoken === "MTA3NjUwOTM4MzcyNDM4MDI2MQ.GR4SbB.wCCAYpg-HkrPqiRqwcb0jBoIteh4kF87b5CyI0") {
        User.count({}, function(err,count) {
            res.json({
                message: count
            })
        })
    }
    else {
        res.json({
            message: "this API is for the blulet Discord bot, not you"
        })
    }
}

module.exports = {
    totaluser
}