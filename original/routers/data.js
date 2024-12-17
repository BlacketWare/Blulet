const express = require('express')
const router = express.Router()
const userdata = require("../api/userdata")
const allposts = require('../api/allposts')
const allnews = require('../api/allnews')
const sendblues = require('../api/getblues')
const leaderboard = require('../api/leaderboard')
const authenticate = require('../middleware/authenticate')
const status = require('../api/status')
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
    app.get('/data/user', authenticate, userdata.userdata)
    app.get('/data/allposts', allposts.sendposts)
    app.get('/data/news', allnews.sendnews)
    app.get('/data/blues', sendblues.sendblues)
    app.get('/data/leaderboard', leaderboard.getleaderboard)
    app.get('/data/status', status.sendStatus)
}