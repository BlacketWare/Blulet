const User = require('../models/User');
const jwt = require('jsonwebtoken')
const ValuesnCapsules = require('./opencapsule.js').ValuesnCapsules
const sellblue = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, 'BENSTEWARTISANIGGER{4^8*534hdHJ}', function (err, decode) {
        User.findOne({
                $or: [{
                    username: decode.name
                }]
            })
            .then(user => {
                if (req.body.blue && typeof req.body.quantity === 'number' && req.body.quantity >= 0 && Number.isInteger(req.body.quantity) === true) {
                    if (ValuesnCapsules.find(capsules => capsules.blues.find(blue => blue.name === req.body.blue))) {
                        if (user.blues.find(o => o.blue === req.body.blue)) {
                            if (user.blues.find(o => o.blue === req.body.blue).quantity < req.body.quantity) {
                                res.json({
                                    message: "you dont have enough of that blue"
                                })
                            } else {
                                if (user.blues.find(o => o.blue === req.body.blue).quantity - req.body.quantity === 0) {
                                    User.findOneAndUpdate({
                                        username: decode.name
                                    }, {
                                        $pull: {
                                            blues: {
                                                "blue": req.body.blue,
                                                "quantity": req.body.quantity
                                            }
                                        }
                                    }).then(err => {
                                        return;
                                    })
                                    totaltokens = ValuesnCapsules.find(capsules => capsules.blues.find(blue => blue.name === req.body.blue)).blues.find(o => o.name === req.body.blue).sell * req.body.quantity
                                    newtokens = user.tokens + totaltokens
                                    User.findOneAndUpdate({
                                        username: decode.name
                                    }, {
                                        $set: {
                                            tokens: newtokens
                                        }
                                    }).then(err => {
                                        return;
                                    })
                                    res.json({
                                        message: `sold ${req.body.quantity} ${req.body.blue}(s)`
                                    })
                                } else {
                                    let triarray = user.blues
                                    triarray.indexOfObject = function (property, value) {
                                        for (let i = 0, len = this.length; i < len; i++) {
                                            if (this[i][property] === value) return i;
                                        }
                                        return -1;
                                    }
                                    User.findOneAndUpdate({
                                        username: decode.name
                                    }, {
                                        $set: {
                                            [`blues.${triarray.indexOfObject("blue",`${req.body.blue}`)}.quantity`]: user.blues.find(o => o.blue == req.body.blue).quantity - req.body.quantity
                                        }
                                    }).then(err => {
                                        return;
                                    })
                                    totaltokens = ValuesnCapsules.find(capsules => capsules.blues.find(blue => blue.name === req.body.blue)).blues.find(o => o.name === req.body.blue).sell * req.body.quantity
                                    newtokens = user.tokens + totaltokens
                                    User.findOneAndUpdate({
                                        username: decode.name
                                    }, {
                                        $set: {
                                            tokens: newtokens
                                        }
                                    }).then(err => {
                                        return;
                                    })
                                    res.json({
                                        message: `sold ${req.body.quantity} ${req.body.blue}(s)`
                                    })
                                }
                            }
                        } else {
                            res.json({
                                message: "You dont have that blue!"
                            })
                        }
                    } else {
                        res.json({
                            message: "that blue doesnt exist"
                        })
                    }
                } else {
                    res.json({
                        message: "please include a blue and a quantity"
                    })
                }
            })
    })
}

module.exports = {
    sellblue
}