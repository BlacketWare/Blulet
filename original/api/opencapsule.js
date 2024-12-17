const jwt = require('jsonwebtoken')
const User = require('../models/User');
const ValuesnCapsules = [{
    name: "OG",
    colors: ["0078ff", "04bdc9"],
    value: 30,
    blues: [{
        name: "Blulet",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "azera",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "BPS",
        chance: "10",
        rarity: "Rare",
        sell: "75"
    }, {
        name: "vuk",
        chance: "10",
        rarity: "Rare",
        sell: "75"
    }, {
        name: "Memefiles",
        chance: "4.5",
        rarity: "Epic",
        sell: "75"
    }, {
        name: "Pablo",
        chance: "0.45",
        rarity: "Legendary",
        sell: "200"
    }, {
	name: "Abejonio",
	chance: "0.45",
	rarity: "Legendary",
	sell: "200"
    },  {
        name: "",
        chance: "0.01",
        rarity: "Chroma",
        sell: "300"
   },  {
        name: "BuzzGaming",
        chance: "0.01",
        rarity: "Chroma",
        sell: "300"
    }, {	
        name: "Jraw",
        chance: "0.0025",
        rarity: "Mystical",
        sell: "1000"
    }],
}, {
    name: "Space",
    colors: ["1c259c", "070028"],
    value: 25,
    blues: [{
        name: "Earth",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Meteor",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Stars",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Alien",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Planet",
        chance: "10",
        rarity: "Rare",
        sell: "20"
    }, {
        name: "UFO",
        chance: "10",
        rarity: "Rare",
        sell: "20",
    }, {
        name: "Spaceship",
        chance: "4.5",
        rarity: "Epic",
        sell: "75"
    }, {
        name: "Astronaut",
        chance: "0.45",
        rarity: "Legendary",
        sell: "200"
    }, {
        name: "Pink Astronaut",
        chance: "0.01",
        rarity: "Chroma",
        sell: "300"
    }, {
        name: "Red Astronaut",
        chance: "0.01",
        rarity: "Chroma",
        sell: "300"
    }, {
        name: "Orange Astronaut",
        chance: "0.01",
        rarity: "Chroma",
        sell: "300"
    }, {
        name: "Yellow Astronaut",
        chance: "0.01",
        rarity: "Chroma",
        sell: "300"
    }, {
        name: "Lime Astronaut",
        chance: "0.01",
        rarity: "Chroma",
        sell: "300"
    }, {
        name: "Green Astronaut",
        chance: "0.01",
        rarity: "Chroma",
        sell: "300"
    }, {
        name: "Cyan Astronaut",
        chance: "0.01",
        rarity: "Chroma",
        sell: "300"
    }, {
        name: "Blue Astronaut",
        chance: "0.01",
        rarity: "Chroma",
        sell: "300"
    }, {
        name: "Purple Astronaut",
        chance: "0.01",
        rarity: "Chroma",
        sell: "300"
    }, {
        name: "Brown Astronaut",
        chance: "0.01",
        rarity: "Chroma",
        sell: "300"
    }, {
        name: "Black Astronaut",
        chance: "0.01",
        rarity: "Chroma",
        sell: "300"
    }, {
        name: "Tim the Alien",
        chance: "0.0025",
        rarity: "Mystical",
        sell: "1000"
    }, {
        name: "Rainbow Astronaut",
        chance: "0.0025",
        rarity: "Mystical",
        sell: "1000"
    }],

}, {
    name: "Bot",
    colors: ["33cc33", "2d8659"],
    value: 20,
    blues: [{
        name: "Lil Bot",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Lovely Bot",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Angry Bot",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Happy Bot",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Watson",
        chance: "10",
        rarity: "Rare",
        sell: "20"
    }, {
        name: "Buddy Bot",
        chance: "10",
        rarity: "Rare",
        sell: "20"
    }, {
        name: "Brainy Bot",
        chance: "4.5",
        rarity: "Epic",
        sell: "75"
    }, {
        name: "Mega Bot",
        chance: "0.45",
        rarity: "Legendary",
        sell: "200"
    }]
}, {
    name: "Color",
    colors: ["ff0000", "ffffff"],
    value: 20,
    blues: [{
        name: "Brown Blue",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Dull Blue Blue",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Dust Blue",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Maroon Blue",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Tan Blue",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Baby Blue Blue",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Gray Blue",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Light Blue Blue",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Lime Blue",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Orange Blue",
        chance: "18.75",
        rarity: "Uncommon",
        sell: "5"
    }, {
        name: "Blue Blue",
        chance: "10",
        rarity: "Rare",
        sell: "20"
    }, {
        name: "Salmon Blue",
        chance: "10",
        rarity: "Rare",
        sell: "20"
    }, {
        name: "Teal Blue",
        chance: "10",
        rarity: "Rare",
        sell: "20"
    }, {
        name: "Burgundy Blue",
        chance: "10",
        rarity: "Rare",
        sell: "20"
    }, {
        name: "Green Blue",
        chance: "10",
        rarity: "Rare",
        sell: "20"
    }, {
        name: "Mint Blue",
        chance: "10",
        rarity: "Rare",
        sell: "20"
    }, {
        name: "Purple Blue",
        chance: "4.5",
        rarity: "Epic",
        sell: "75"
    }, {
        name: "Yellow Blue",
        chance: "4.5",
        rarity: "Epic",
        sell: "75"
    }, {
        name: "Red Blue",
        chance: "4.5",
        rarity: "Epic",
        sell: "75"
    }, {
        name: "White Blue",
        chance: "0.45",
        rarity: "Legendary",
        sell: "200"
    }, {
        name: "Black Blue",
        chance: "0.45",
        rarity: "Legendary",
        sell: "200"
    }, {
        name: "Pink Blue",
        chance: "0.01",
        rarity: "Chroma",
        sell: "300"
    }]
}];

const opencapsule = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, 'BENSTEWARTISANIGGER{4^8*534hdHJ}', function (err, decode) {
        User.findOne({
                $or: [{
                    username: decode.name
                }]
            })
            .then(user => {
                if (req.body.capsule) {
                    if (ValuesnCapsules.find(o => o.name === req.body.capsule)) {
                        if (user.tokens == ValuesnCapsules.find(o => o.name === req.body.capsule).value || user.tokens >= ValuesnCapsules.find(o => o.name === req.body.capsule).value) {
                            let blues = ValuesnCapsules.find(o => o.name === req.body.capsule).blues;
                            let blue;
                            for (let done = false; !done;) {
                                blue = blues[Math.floor(Math.random() * blues.length)];
                                if (Math.random() * 100 <= ValuesnCapsules.find(o => o.name === req.body.capsule).blues.find(o => o.name === blue.name).chance / 100) done = true;
                            }
                            newtokens = user.tokens - ValuesnCapsules.find(o => o.name === req.body.capsule).value
                            User.findOneAndUpdate({
                                username: decode.name
                            }, {
                                $set: {
                                    tokens: newtokens
                                }
                            }).then(err => {
                                return;
                            })
                            if (user.opened === 0) {
                                User.findOneAndUpdate({
                                    username: decode.name
                                }, {
                                    $set: {
                                        opened: 1
                                    }
                                }).then(err => {
                                    return;
                                })
                            } else {
                                User.findOneAndUpdate({
                                    username: decode.name
                                }, {
                                    $set: {
                                        opened: user.opened + 1
                                    }
                                }).then(err => {
                                    return;
                                })
                            }

                            if (user.blues.find(o => o.blue === blue.name)) {
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
                                        [`blues.${triarray.indexOfObject("blue", `${blue.name}`)}.quantity`]: user.blues.find(o => o.blue == blue.name).quantity + 1
                                    }
                                }).then(err => {
                                    return;
                                })
                                res.json({
                                    blue: blue.name,
                                    rarity: blue.rarity,
                                    new: false,
                                });
                            } else {
                                User.findOneAndUpdate({
                                    username: decode.name
                                }, {
                                    $push: {
                                        blues: {
                                            "blue": blue.name,
                                            "quantity": 1
                                        }
                                    }
                                }).then(err => {
                                    return;
                                })
                                res.json({
                                    blue: blue.name,
                                    rarity: blue.rarity,
                                    new: true,
                                });
                            }

                        } else {
                            res.json({
                                message: "Not enough tokens"
                            })
                        }
                    } else {
                        res.json({
                            message: "invalid capsule"
                        })
                    }
                } else {
                    res.json({
                        message: "please include a capsule"
                    })
                }
            })
    })
}

module.exports = {
    opencapsule,
    ValuesnCapsules
}