const bcrypt = require('bcryptjs')

var mysqlpool = require('../../../db')

async function getUser(email) {
    return user = await mysqlpool.query(
        'SELECT user_id, user_username, user_email FROM user WHERE user_email = ?', [email]
    )
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

    return result.insertId
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

async function loginUser(userData) {
    const { email, password } = userData

    const hashedPassword = await mysqlpool.query(
        'SELECT user_password FROM user WHERE user_email = ?', [email]
    )

    const comparePassword = bcrypt.compareSync(password, hashedPassword[0][0].user_password);

    const user = await getUser(email)

    return {
        comparePassword,
        user
    }
}

async function updateUsername(newName, userId) {
    const { newUsername } = newName

    const [result] = await mysqlpool.query(
        'UPDATE user SET user_username = ?, user_updated_date = CURRENT_TIMESTAMP WHERE user_id = ?',
        [newUsername, userId]
    );

    return result
}

async function saveReportImage(image, reportId) {

    const [result] = await mysqlpool.query(
        'UPDATE report SET report_image = ? WHERE report_id = ?',
        [image, reportId]
    )

    return result
}


module.exports = {
    createNewUser,
    loginUser,
    createNewReport,
    updateUsername,
    saveReportImage
}