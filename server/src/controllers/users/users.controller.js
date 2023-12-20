const {
    createNewUser,
    loginUser
} = require('../../models/users/users.model')

async function httpCreateNewUser(req, res) {
    try {
        const userData = req.body

        const userId = await createNewUser(userData);

        res.status(201).json({ userId, message: 'User created successfully' })
    }
    catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

async function httpLoginUser(req, res) {
    try {
        const userData = req.body

        const result = await loginUser(userData)

        res.status(200).json({ result, message: 'User log in successfully' })
    }
    catch (error) {
        console.log(error)
        res.status(400).send('Log In Error')
    }
}

module.exports = {
    httpCreateNewUser,
    httpLoginUser
}