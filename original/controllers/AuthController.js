const User = require('../models/User');
const bcrypt = require('bcrypt')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    if (req.body.username && req.body.password) {
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
                        message: "User Already Exists"
                    })
                } else {
                    if (req.body.password.length < 6) {
                        res.json({
                            message: "Password Must be 6 Chars or Longer"
                        })

                        if (typeof req.body.password !== 'string') {
                            res.json({
                                message: "Password must be a string"
                            })
                        }
                    } else {
                        if (typeof req.body.username !== 'string') {
                            return res.json({
                                message: "Username must be a string"
                            })
                        }

                        if (!/^[a-zA-Z0-9_]+$/.test(req.body.username)) {
                            return res.json({
                                message: "Username must only contain letters, numbers, and underscores"
                            })
                        }

                        if (req.body.username.length > 16) {

                            return res.end(JSON.stringify({
                                message: "Username Must be Less Than 16 Chars"
                            }))
                        } else if (req.body.username.length < 3) {
                            return res.end(JSON.stringify({
                                message: "Username Must be More Than 3 Chars"
                            }))
                        } else {
                            bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
                                if (err) {
                                    res.json({
                                        error: err
                                    })
                                }

                                let user = new User({
                                    username: req.body.username,
                                    password: hashedPass,
                                    ip: md5(req.ip),
                                    tokens: 3000000,
                                    blues: [],
                                    pfp: '/media/misc/favicon.png',
                                    lowercase: userlower,
                                    banned: false,
                                    reason: '',
                                    banby: '',
                                    opened: 0,
                                    role: 'Common'
                                })
                                user.save()
                                    .then(user => {
                                        let token = jwt.sign({
                                            name: user.username
                                        }, 'BENSTEWARTISANIGGER{4^8*534hdHJ}', {
                                            expiresIn: '1h'
                                        })
                                        req.session.user = user
                                        res.json({
                                            message: 'User Added Successfully',
                                            tokenraw: `blulet ${token}`,
                                            token: token
                                        })
                                    })
                                    .catch(error => {
                                        return res.json({
                                            message: 'An error occured'
                                        });
                                    })
                            })
                        }
                    }
                }
            })
    } else {
        res.json({
            message: "Fill Out All Fields"
        })
    }
}

const login = (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    let usertrim = username.trim()
    let userlower = usertrim.toLowerCase()
    User.findOne({
            $or: [{
                lowercase: userlower
            }]
        })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }

                    if (result) {
                        if (user.banned !== true) {
                            // set the ip
                            User.findOneAndUpdate({
                                username: user.username
                            }, {
                                $set: {
                                    ip: md5(req.ip)
                                }
                            }).then(err => {
                                return;
                            })
                            let token = jwt.sign({
                                name: user.username
                            }, 'BENSTEWARTISANIGGER{4^8*534hdHJ}', {
                                expiresIn: '1h'
                            })
                            req.session.user = user
                            res.json({
                                message: 'login Successful',
                                tokenraw: `blulet ${token}`,
                                token: token
                            })
                        } else {
                            res.json({
                                message: `Banned By: ${user.banby}. Reason: ${user.reason}`
                            })
                        }
                    } else {
                        res.json({
                            message: "Incorrect Password"
                        })
                    }

                })
            } else {
                res.json({
                    message: "No User Found"
                })
            }
        })
}

module.exports = {
    register,
    login
}