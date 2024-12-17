const User = require('../models/User');

const ifuser = (req,res,next) => {
    if (req.body.accesstoken === "MTA3NjUwOTM4MzcyNDM4MDI2MQ.GR4SbB.wCCAYpg-HkrPqiRqwcb0jBoIteh4kF87b5CyI0") {
        if (req.body.username) {
            User.findOne({$or: [{username:req.body.username}]})
            .then(user => {
                if (user) {
                    res.json({
                        message: "yes user"
                    })
                }
                else {
                    res.json({
                        message: "no user"
                    })
                }
            })
        }
        else {
        res.json({
            message: "continue"
        })
    }
    }
    else {
        res.json({
            message: "this API is for the blulet Discord bot, not you"
        })
    }
}

module.exports = {
    ifuser
}