const bcrypt = require('bcryptjs')

var mysqlpool = require('../../../db')

async function getUserByEmail(email) {
    user = await mysqlpool.query(
        'SELECT user_id, user_username, user_email, user_phone, user_profile_picture, user_password FROM user WHERE user_email = ?',
        [email]
    )

    return user[0][0]
}

async function getUserById(userId) {
    user = await mysqlpool.query(
        'SELECT user_id, user_username, user_email, user_phone, user_profile_picture, user_password FROM user WHERE user_id = ?',
        [userId]
    )

    return user[0][0]
}

async function getUserById(userId) {
    user = await mysqlpool.query(
        'SELECT user_id, user_username, user_email, user_phone, user_profile_picture, user_password FROM user WHERE user_id = ?',
        [userId]
    )

    return user[0][0]
}

async function createNewUser(userData) {

    const { firstname, lastname, email, password } = userData

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const fullname = `${firstname} ${lastname}`;

    const [result] = await mysqlpool.query(
        'INSERT INTO user (user_username, user_email, user_password, user_created_date) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
        [fullname, email, hashedPassword]
    )

    const user = await getUserById(result.insertId)

    return user
}

async function loginUser(userData) {
    const { email, password } = userData

    const hashedPassword = await mysqlpool.query(
        'SELECT user_password FROM user WHERE user_email = ?', [email]
    )

    const comparePassword = bcrypt.compareSync(password, hashedPassword[0][0].user_password);

    const user = await getUserByEmail(email)

    return {
        comparePassword,
        user
    }
}

async function updateProfile(username, email, phone, userId) {

    const [result] = await mysqlpool.query(
        'UPDATE user SET user_username = ?, user_email = ?, user_phone = ?, user_updated_date = CURRENT_TIMESTAMP WHERE user_id = ?',
        [username, email, phone, userId]
    );
    console.log(result)
    return result
}

async function updatePassword(userId, newPassword) {

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(newPassword, salt)

    const [result] = await mysqlpool.query(
        'UPDATE user SET user_password = ?, user_updated_date = CURRENT_TIMESTAMP WHERE user_id = ?',
        [hashedPassword, userId]
    )

    return result
}

async function createNewReport(reportData) {
    const { category, venue, level, room, description, status, review, user_id } = reportData

    const [result] = await mysqlpool.query(
        'INSERT INTO report (report_category, report_venue, report_level, report_room, report_description, report_status, report_has_reviewed, user_id, report_created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
        [category, venue, level, room, description, status, review, user_id]
    )

    const lastInsertId = result.insertId;

    return { reportId: lastInsertId, result }
}


async function saveReportImage(image, reportId) {

    const [result] = await mysqlpool.query(
        'UPDATE report SET report_image = ? WHERE report_id = ?',
        [image, reportId]
    )

    return result
}

async function getAllReport(userId) {
    report = await mysqlpool.query(
        `SELECT * FROM report WHERE user_id = ${userId};`
    )

    return report[0]
}

async function createReview(report_id, rating1, rating2, comment) {
    const [reviewResult] = await mysqlpool.query(
        'INSERT INTO review (report_id, review_rating_1, review_rating_2, review_comment, review_created_date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
        [report_id, rating1, rating2, comment]
    )

    const [reportResult] = await mysqlpool.query(
        'UPDATE report SET report_has_reviewed = ? WHERE report_id = ?',
        [1, report_id]
    );

    return { reviewResult, reportResult }
}

async function getAllCategory() {
    const [categoryData] = await mysqlpool.query(
        'SELECT * from menu'
    )

    return categoryData
}

async function contactUs(username, phone, email, message) {
    const [result] = await mysqlpool.query(
        'INSERT INTO contact (contact_us_name, contact_us_email, contact_us_phone, contact_us_message, contact_us_delete, contact_us_created_date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
        [username, email, phone, 'false', message]
    )
}

async function saveUserImage(image, userId) {
    const [result] = await mysqlpool.query(
        'UPDATE user SET user_profile_picture = ? WHERE user_id = ?',
        [image, userId]
    )

    return result
}

async function deleteProfilePicture(userId) {
    const [result] = await mysqlpool.query(
        'UPDATE user SET user_profile_picture = ? WHERE user_id = ?',
        [null, userId]
    )

    return result
}

module.exports = {
    createNewUser,
    loginUser,
    createNewReport,
    updateProfile,
    saveReportImage,
    getAllReport,
    getUserById,
    getUserByEmail,
    updatePassword,
    createReview,
    getAllCategory,
    contactUs,
    saveUserImage,
    deleteProfilePicture
}