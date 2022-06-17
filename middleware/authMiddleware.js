const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.json("ERROR-Token needed!")
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        console.log(decoded);

        next()

    } catch (error) {
        res.status(400).json('Invalid token!')
    }
}