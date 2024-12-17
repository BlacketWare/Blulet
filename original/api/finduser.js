const User = require('../models/User');

const finduser = (req, res, next) => {
    if (req.body.username || req.body.id) {
        if (req.body.id) {
            User.countDocuments({
                _id: req.body.id
            }, function (err, count) {
                if (count > 0) {
                    User.findOne({
                            $or: [{
                                _id: req.body.id
                            }]
                        })
                        .then(user => {
                            res.json({
                                username: user.username,
                                tokens: user.tokens,
                                blues: user.blues,
                                pfp: user.pfp,
                                role: user.role,
                                opened: user.opened,
                                id: user._id,
                            })
                        })
                } else {
                    res.json({
                        error: "User Doesn't Exist"
                    })
                }
            });
        } else {
            let username = req.body.username
            let usertrim = username.trim()
            let userlower = usertrim.toLowerCase()
            User.findOne({
                    $or: [{
                        lowercase: userlower
                    }]
                })
                .then(user => {
                    if (user) {
                        res.json({
                            username: user.username,
                            tokens: user.tokens,
                            blues: user.blues,
                            pfp: user.pfp,
                            role: user.role,
                            opened: user.opened,
                            id: user._id,
                        })
                    } else {
                        res.json({
                            error: "User Doesn't Exist"
                        })
                    }
                })
        }
    } else {
        res.json({
            error: "Please Include a Username"
        })
    }
}

module.exports = {
    finduser
}