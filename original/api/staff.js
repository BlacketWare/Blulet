const User = require('../models/User');
const jwt = require('jsonwebtoken')


// an endpoint to ban or mute
/*
    the body sent will be like this:
    body: {
        action: "ban" or "mute",
        username: "username",
        reason: "reason",
    }
*/

// the fields in the db will be like this:
/*
    banned: "true" or "false",
    reason: "reason",
    bannedby: "STAFF",
*/

const action = (req, res, next) => {
    if (req.body.username && req.body.action && req.body.reason) {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'BENSTEWARTISANIGGER{4^8*534hdHJ}', function (err, decode) {
            User.findOne({
                    $or: [{
                        username: decode.name
                    }]
                })
                .then(user => {
                    if (user.role !== "Owner" || user.role !== "Admin" || user.role !== "Moderator") {
                        res.json({
                            error: true,
                            message: "You do not have permission to do this."
                        })
                    }
                })
        })


        if (req.body.action === "ban") {
            User.findOneAndUpdate({
                username: req.body.username
            }, {
                $set: {
                    banned: "true",
                    reason: req.body.reason,
                    bannedby: req.user.name
                }
            }).then(user => {
                res.json({
                    message: "banned"
                })
            })
        } else if (req.body.action === "mute") {
            // User.findOneAndUpdate({
            //     username: req.body.username
            // }, {
            //     $set: {
            //         muted: "true",
            //         reason: req.body.reason,
            //         mutedby: "STAFF",
            //     }
            // }).then(user => {
            //     res.json({
            //         message: "muted"
            //     })
            // })

            return res.json({
                error: true,
                message: "This endpoint is currently disabled."
            })
        } else {
            res.json({
                message: "invalid action"
            })
        }
    } else {
        res.json({
            message: "please include all fields"
        })
    }
}

module.exports = {
    action
}