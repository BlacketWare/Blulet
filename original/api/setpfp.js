const User = require("../models/User")
const ValuesnCapsules = require("./opencapsule").ValuesnCapsules
const setpfp = (req, res, next) => {
    if (req.body.blue) {
        User.findOne({
                $or: [{
                    username: req.user.name
                }]
            })
            .then(user => {
                if (ValuesnCapsules.find(capsules => capsules.blues.find(blue => blue.name === req.body.blue))) {
                    if (user.blues.find(o => o.blue === req.body.blue)) {
                        capsule = ValuesnCapsules.find(array => {
                            return array.blues.find(blue => blue.name === req.body.blue);
                        })
                        User.findOneAndUpdate({
                            username: req.user.name
                        }, {
                            $set: {
                                pfp: `/media/capsules/${capsule.name}/blues/${req.body.blue}.png`
                            }
                        }).then(err => {
                            return;
                        })
                        res.json({
                            message: "pfp set"
                        })
                    } else {
                        res.json({
                            message: "you dont have that blue"
                        })
                    }
                } else {
                    res.json({
                        message: "that blue doesnt exist"
                    })
                }
            })
    } else {
        res.json({
            message: "please include a blue"
        })
    }
}

module.exports = {
    setpfp
}