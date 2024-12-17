const sendStatus = (req, res) => {
    res.json({
        error: false,
        status: 200,
    })
}

module.exports = {
    sendStatus
}