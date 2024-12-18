const User = require('../models/User');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
let id;
const setusername = (req, res, next) => {
    if (req.body.newuser && req.body.password) {
        let newusername = req.user.name
        let usertrim = newusername.trim()
        let userlower = usertrim.toLowerCase()
        User.findOne({
                $or: [{
                    lowercase: userlower
                }]
            })
            .then(user => {
                password = user.password
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }


                    if (result) {
                        let newusername = req.body.newuser
                        let usertrim = newusername.trim()
                        let userlower = usertrim.toLowerCase()
                        User.findOne({
                                $or: [{
                                    lowercase: userlower
                                }]
                            })
                            .then(user => {

                                if (user) {
                                    if (user.username == req.body.newuser) {
                                        res.json({
                                            error: "Thats already your name, silly!"
                                        })
                                    } else {
                                        res.json({
                                            error: "Username taken"
                                        })
                                    }
                                } else {
                                    if (req.body.newuser.length > 16) {
                                        res.json({
                                            error: "Username Must be Less Than 16 Chars"
                                        })
                                    } else if (req.body.newuser.length < 3) {
                                        res.json({
                                            error: "Username Must be at Least 3 Char Long"
                                        })
                                    } else {
                                        let newusername = req.body.newuser
                                        let usertrim = newusername.trim()
                                        let userlower = usertrim.toLowerCase()
                                        User.findOneAndUpdate({
                                            password: password
                                        }, {
                                            $set: {
                                                username: `${req.body.newuser}`
                                            }
                                        }).then(err => {})

                                        User.findOneAndUpdate({
                                            password: password
                                        }, {
                                            $set: {
                                                lowercase: `${userlower}`
                                            }
                                        }).then(err => {})
                                        let token = jwt.sign({
                                            name: req.body.newuser
                                        }, 'BENSTEWARTISANIGGER{4^8*534hdHJ}', {
                                            expiresIn: '1h'
                                        })
                                        res.json({
                                            message: "Username Set!",
                                            token: token,
                                            tokenraw: `blulet ${token}`
                                        })
                                    }
                                }
                            })
                    } else {
                        res.json({
                            error: "Incorrect Password"
                        })
                    }
                })
            })
    } else {
        res.json({
            error: "Please include a new username and a password"
        })
    }

}

module.exports = {
    setusername
}