const jwt = require('jsonwebtoken')

const authentication = async (req, res, next) => {
    const token = req.cookies.token
    console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, process.env.tokenSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalid. Please log in again' })
        }

        req.user = user
        console.log(req.user)

        next()
    })
}

module.exports = authentication