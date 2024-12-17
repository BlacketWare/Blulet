const User = require('../models/User');
const fs = require('fs')

const claim = (req, res, next) => {

    User.findOneAndUpdate({
        username: req.user.name
    }, {
        $set: {
            tokens: user.tokens + 500
        }
    }).then(err => {
        return;
    })

    res.json({
        message: "claimed"
    });
};

module.exports = {
    claim
}