const User = require('../models/User');
const jwt = require('jsonwebtoken')
let blues;
async function removeIds(array) {
  for (let i = 0; i < array.length; i++) {
    delete array[i]._id;
  }
  return array;
}
const userdata = (req, res, next) => {
  console
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, 'BENSTEWARTISANIGGER{4^8*534hdHJ}', function (err, decode) {
    User.findOne({
        $or: [{
          username: decode.name
        }]
      })
      .then(user => {
        let userblues = user.blues;
        userblues.forEach(obj => {
          delete obj._id;
        });
        res.json({
          username: user.username,
          tokens: user.tokens,
          blues: userblues,
          pfp: user.pfp,
          role: user.role,
          opened: user.opened,
          banned: user.banned,
          id: user._id,
          joined: user.createdAt
        })
      })
  })
}

module.exports = {
  userdata
}