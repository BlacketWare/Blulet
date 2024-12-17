const jwt = require('jsonwebtoken')
const posts = require('../storage/posts.json')
const fs = require("fs")
const wash = require('washyourmouthoutwithsoap'); // WWW
const cuid = require("cuid");
const { title } = require('process');
const storedata = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (req.body.title) {
        if (req.body.body) {
        jwt.verify(token,'BENSTEWARTISANIGGER{4^8*534hdHJ}', function(err,decode){
            if(err){
                res.status(400).json({
                    err
                })
            }
            else {//posts api (warning ass) (awesome)
                if (req.body.title.length > 40) {
                    res.json({
                        message: "max of 50 chars for the title"
                    })

                }
                else {
                    if (req.body.body.length > 500) {
                        res.json({
                            message: "max of 500 chars for the body"
                        })
                    }
                    else {
                        if (wash.check('en', req.body.title) === false && wash.check('en', req.body.body) === false) {
                            let postid = cuid()
                            posts[postid] = {
                                "title": req.body.title,
                                "body": req.body.body,
                                "user": decode.name,
                                "likes": []
                            }
                            fs.writeFileSync('./storage/posts.json', JSON.stringify(posts))
                            res.json({
                                message: 'post added',
                                id: postid
                            })
                        }
                        else {
                            res.json({
                                message: "Inappropriate Title/Body"
                            })
                        }
                    }
                }
          
        }
        })
    }
    else {
        res.json({
            message: "missing body"
        })
    }
    }
    else {
        res.json({
            message: 'missing title'
        })
    }
}

module.exports = {
    storedata
}