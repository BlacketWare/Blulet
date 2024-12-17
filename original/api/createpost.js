const posts = require("../storage/posts.json")
const wash = require('washyourmouthoutwithsoap')
const cuid = require('cuid')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const create = (req, res, next) => {
    if (req.body.title) {
        if (req.body.body) {
            if (req.body.title.length > 50) {
                res.json({
                    message: "The title is too long"
                })
                if (req.body.title.includes('<') || req.body.title.includes('>')) {
                    res.json({
                        message: "The title cannot contain HTML tags"
                    })
                }

                if (typeof req.body.title !== 'string') {
                    res.json({
                        message: "The title must be a string"
                    })
                }
            } else {
                if (req.body.body.length > 500) {
                    res.json({
                        message: "The body is too long"
                    })

                    if (req.body.body.includes('<') || req.body.body.includes('>')) {
                        res.json({
                            message: "The body cannot contain HTML tags"
                        })
                    }

                    if (typeof req.body.body !== 'string') {
                        res.json({
                            message: "The body must be a string"
                        })
                    }
                } else {
                    if (wash.check('en', req.body.title) === false && wash.check('en', req.body.body) === false) {
                        let postid = cuid()
                        posts[postid] = {
                            "title": req.body.title,
                            "body": req.body.body,
                            "user": req.user.name,
                            "date": Date.now(),
                            "pinned": false,
                            "likes": []
                        }
                        fs.writeFileSync('./storage/posts.json', JSON.stringify(posts))
                        res.json({
                            message: 'Post created!',
                            id: postid
                        })
                    } else {
                        res.json({
                            message: "Inappropriate Title/Body"
                        })
                    }
                }
            }
        } else {
            res.json({
                message: "Missing body"
            })
        }
    } else {
        res.json({
            message: "Missing title"
        })
    }
}

module.exports = {
    create
}