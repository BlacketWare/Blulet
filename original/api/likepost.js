const posts = require('../storage/posts.json')
const fs = require("fs");

const likepost = (req, res, next) => {
    if (req.body.postid) {
        postid = req.body.postid
        if (posts[postid]) {
            if (posts[postid].likes.includes(req.user.name)) {
                const indexToRemove = posts[postid].likes.indexOf(req.user.name);
                if (indexToRemove !== -1) {
                    posts[postid].likes.splice(indexToRemove, 1);
                }
                fs.writeFileSync('./storage/posts.json', JSON.stringify(posts));
                res.json({
                    message: "like removed"
                });
            } else {
                // posts[postid].likes.push(req.user.name)
                // fs.writeFileSync('./storage/posts.json', JSON.stringify(posts))
                // res.json({
                //     message: "like added"
                // })

                if (posts[postid].likes.includes(req.user.name)) {
                    res.json({
                        message: "you already liked this post"
                    });
                } else {
                    posts[postid].likes.push(req.user.name)
                    fs.writeFileSync('./storage/posts.json', JSON.stringify(posts))
                    res.json({
                        message: "like added"
                    })
                }
            }
        } else {
            res.json({
                message: "that post does not exist"
            })
        }
    } else {
        res.json({
            message: "please include a post id"
        })
    }
}

module.exports = {
    likepost
}