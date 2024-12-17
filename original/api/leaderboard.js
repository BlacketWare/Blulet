const User = require('../models/User');

const getleaderboard = (req, res, next) => {
    // most tokens to least tokens, max 10
    // User.find({}).sort({
    //         tokens: -1
    //     }).limit(10)
    //     .then(users => {
    //         res.json({
    //             users
    //         })
    //     })

    // do not send back the users password or ip
    User.find({}).sort({
            tokens: -1
        }).limit(10)
        // ONLY SEND BACK THE FOLLOWING:
        // username, tokens, _id
        .then(users => {
            res.json({
                users: users.map(user => {
                    return {
                        username: user.username,
                        tokens: user.tokens,
                        _id: user._id
                    }
                })
            })
        })
}

module.exports = {
    getleaderboard
}