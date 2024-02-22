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
    const admin = await mysqlpool.query(
        'SELECT admin_id, admin_name, admin_email, admin_password FROM admin WHERE admin_id = ?',
        [adminId]
    )

    return admin[0][0]
}

async function getAllAdmin() {
    const admin = await mysqlpool.query(
        'SELECT admin_id, admin_name, admin_email FROM admin'
    )

    return admin[0]
}

async function createAdmin(name, email, password) {

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const [result] = await mysqlpool.query(
        'INSERT INTO admin (admin_name, admin_email, admin_password, admin_created_date) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
        [name, email, hashedPassword]
    )

    const admin = await getAdminById(result.insertId)

    return admin
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

async function getDashboardData() {
    try {
        const [allReport] = await mysqlpool.query(
            'SELECT * FROM report'
        )

        const [allUser] = await mysqlpool.query(
            'SELECT user_id, user_username, user_email, user_created_date from user'
        )

        return {
            allReport,
            allUser
        }
    } catch (error) {
        console.error(error)
    }
}

async function getUserFromReport(userId) {
    const user = await mysqlpool.query(
        'SELECT user_id, user_username, user_email, user_phone FROM user WHERE user_id = ?',
        [userId]
    )

    return user[0][0]
}

async function getAllReview() {
    const [allReview] = await mysqlpool.query(
        'SELECT * FROM review'
    )

    return allReview
}

async function acceptNewReport(reportId) {
    const [result] = await mysqlpool.query(
        'UPDATE report SET report_status  = ?, report_updated_date = CURRENT_TIMESTAMP WHERE report_id = ?',
        ['Progressing', reportId]
    )

    return result
}

async function rejectNewReport(reportId) {
    const [result] = await mysqlpool.query(
        'UPDATE report SET report_status  = ?, report_updated_date = CURRENT_TIMESTAMP WHERE report_id = ?',
        ['Rejected', reportId]
    )

    return result
}

async function changePassword(adminId, oldPassword, newPassword) {

    const admin = await getAdminById(adminId)

    const comparePassword = bcrypt.compareSync(oldPassword, admin.admin_password)

    if (admin && comparePassword) {
        try {
            const salt = await bcrypt.genSalt(10)

            const hashedPassword = await bcrypt.hash(newPassword, salt)

            const [result] = await mysqlpool.query(
                'UPDATE admin SET admin_password = ?, admin_updated_date = CURRENT_TIMESTAMP WHERE admin_id = ?',
                [hashedPassword, adminId]
            )

            return result
        }
        catch (error) {
            throw error
        }
    }
    else {
        throw new Error('Error changing password')
    }
}

async function setCompletedImage(reportId, imageUrl) {

    const [result] = await mysqlpool.query(
        'UPDATE report SET report_completed_image = ?, report_status= ?, report_updated_date = CURRENT_TIMESTAMP WHERE report_id = ?',
        [imageUrl, 'Completed', reportId]
    )

    return result
}

async function createNewCategory(name, imageLink) {

    const [result] = await mysqlpool.query(
        'INSERT INTO menu (menu_name, menu_image, menu_is_deleted, menu_created_date) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
        [name, imageLink, 'false']
    )

    return result

}

async function getAllCategory() {
    const [categoryData] = await mysqlpool.query(
        'SELECT * from menu'
    )

    return categoryData
}

async function getAllContact() {
    const [result] = await mysqlpool.query(
        'SELECT * from contact'
    )

    return result
}

async function deleteContact(contactId) {

    const [result] = await mysqlpool.query(
        'UPDATE contact SET contact_us_delete = ?, contact_us_deleted_date = CURRENT_TIMESTAMP WHERE contact_us_id = ?',
        ['true', contactId]
    )

    return result
}

async function deleteCategory(categoryId) {
    const [result] = await mysqlpool.query(
        'UPDATE menu SET menu_is_deleted = ?, menu_deleted_date = CURRENT_TIMESTAMP WHERE menu_id = ?',
        ['true', categoryId]
    )

    const categoryData = getAllCategory()

    return categoryData
}

module.exports = {
    createAdmin,
    adminLogin,
    getAdminByEmail,
    getAdminById,
    adminResetPassword,
    getDashboardData,
    getUserFromReport,
    getAllReview,
    acceptNewReport,
    rejectNewReport,
    changePassword,
    setCompletedImage,
    createNewCategory,
    getAllCategory,
    getAllAdmin,
    getAllContact,
    deleteContact,
    deleteCategory
}