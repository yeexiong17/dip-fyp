const jwt = require('jsonwebtoken')

const userAuth = async (req, res, next) => {
    const token = req.cookies.userToken

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, process.env.userTokenSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalid. Please log in again' })
        }

        req.user = user
        console.log(req.user)

        next()
    })
}

const adminAuth = async (req, res, next) => {
    const token = req.cookies.adminToken

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, process.env.adminTokenSecret, (err, admin) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalid. Please log in again' })
        }

        req.admin = admin
        console.log(req.admin)

        next()
    })
}

module.exports = {
    userAuth,
    adminAuth
}