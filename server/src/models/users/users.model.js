const bcrypt = require('bcryptjs')

var mysqlpool = require('../../../db')

async function createNewUser(userData) {

    const { firstname, lastname, email, password } = userData

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const [result] = await mysqlpool.query(
        'INSERT INTO user (user_firstname, user_lastname, user_email, user_password, user_created_date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
        [firstname, lastname, email, hashedPassword]
    )

    return result.insertId
}

async function loginUser(userData) {
    const { email, password } = userData

    const hashedPassword = await mysqlpool.query(
        'SELECT user_password FROM user WHERE user_email = ?', [email]
    )

    const comparePassword = bcrypt.compareSync(password, hashedPassword[0][0].user_password);

    return comparePassword

}

module.exports = {
    createNewUser,
    loginUser
}