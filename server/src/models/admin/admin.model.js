const bcrypt = require('bcryptjs')

var mysqlpool = require('../../../db')

async function getAdminByEmail(adminEmail) {
    const admin = await mysqlpool.query(
        'SELECT admin_id, admin_name, admin_email, admin_password FROM admin WHERE admin_email = ?',
        [adminEmail]
    )

    return admin[0][0]
}

async function getAdminById(adminId) {
    console.log(adminId)
    const admin = await mysqlpool.query(
        'SELECT admin_id, admin_name, admin_email, admin_password FROM admin WHERE admin_id = ?',
        [adminId]
    )

    return admin[0][0]
}

async function createAdmin(name, email, password) {

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const [result] = await mysqlpool.query(
        'INSERT INTO admin (admin_name, admin_email, admin_password, admin_created_date) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
        [name, email, hashedPassword]
    )

    const admin = await getAdminById(result.insertId)

    return admin[0][0]
}

async function adminLogin(email, password) {

    const admin = await getAdminByEmail(email)

    if (!admin) {
        return {
            comparePassword: false,
            admin: false
        }
    }

    const hashedPassword = await mysqlpool.query(
        'SELECT admin_password FROM admin WHERE admin_email = ?', [email]
    )

    const comparePassword = bcrypt.compareSync(password, hashedPassword[0][0].admin_password);

    return {
        comparePassword,
        admin: admin
    }

}

async function adminResetPassword(adminId, newPassword) {
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(newPassword, salt)

    const [result] = await mysqlpool.query(
        'UPDATE admin SET admin_password = ?, admin_updated_date = CURRENT_TIMESTAMP WHERE admin_id = ?',
        [hashedPassword, adminId]
    )

    return result
}

module.exports = {
    createAdmin,
    adminLogin,
    getAdminByEmail,
    getAdminById,
    adminResetPassword
}