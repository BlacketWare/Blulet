const express = require('express')
const router = express.Router()
const AuthController = require("../controllers/AuthController")
const CheckLogin = require("../api/CheckLogin")
const finduser = require("../api/finduser")
const setpfp = require("../api/setpfp")
const OpenCapsule = require("../api/opencapsule")
const CreatePost = require("../api/createpost")
const sellblue = require('../api/sellblue')
const staff = require('../api/staff')
const likepost = require('../api/likepost')
const setusername = require('../api/changeusername')
const ifuser = require("../api/checkifuser")
const totaluser = require("../api/totalusers")
const setpassword = require("../api/changepassword")
const newrole = require("../api/setrole")
const claim = require("../api/claim")
const jsonstore = require("../api/jsonstore")
const authenticate = require('../middleware/authenticate')
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    max: 1,
    windowMs: 200,
    message: JSON.stringify({
        "error": true,
        "message": "Rate Limit"
    })
})


module.exports = (app) => {
    app.post('/api/register', limiter, AuthController.register)
    app.post('/api/login', limiter, AuthController.login)
    app.post('/api/check-login', CheckLogin.CheckLogin)
    app.post('/api/open', limiter, authenticate, OpenCapsule.opencapsule)
    app.post('/api/addpost', limiter, authenticate, CreatePost.create)
    app.post('/api/sell', limiter, authenticate, sellblue.sellblue)
    app.post('/api/like', limiter, authenticate, likepost.likepost)
    app.post('/api/setrole', limiter, authenticate, newrole.setrole)
    app.post('/bot/ifuser', ifuser.ifuser)
    app.post('/bot/totalusers', totaluser.totaluser)
    app.post('/api/finduser', limiter, finduser.finduser)
    app.post("/api/setpfp", limiter, authenticate, setpfp.setpfp)
    app.post("/api/setusername", limiter, authenticate, setusername.setusername)
    app.post("/api/setpassword", limiter, authenticate, setpassword.setpassword)
    app.post("/api/staff", limiter, authenticate, staff.action)
    app.post("/api/claim", limiter, authenticate, claim.claim)
}