const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'BENSTEWARTISANIGGER{4^8*534hdHJ}')

        req.user = decode
        next()
    } catch (error) {
        if (error.name == "TokenExpiredError") {
            res.status(401).json({
                message: "Token Expired"
            })
        } else {
            res.json({
                message: 'Unauthorized'
            })
        }
    }
}

module.exports = authenticate