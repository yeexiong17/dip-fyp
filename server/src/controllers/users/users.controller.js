const {
    createNewUser,
    loginUser,
    createNewReport,
    updateUsername,
    saveReportImage
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

        const { comparePassword, user } = await loginUser(userData);

        if (comparePassword && user) {
            res.status(200).json({ message: 'User logged in successfully', user: user[0][0] });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function httpCreateReport(req, res) {
    try {
        const userReportData = req.body

        const result = await createNewReport(userReportData)

        res.status(200).json({ result, message: 'Report saved succesfully' })

    }
    catch (error) {
        console.log(error)
        res.status(400).send('Error Saving Report')
    }
}

async function httpUpdateUsername(req, res) {
    const userId = req.params.userId

    try {
        const newUsername = req.body

        const result = await updateUsername(newUsername, userId)

        res.status(200).json({ result, message: 'Username updated succesfully' })

    }
    catch (error) {
        console.log(error)
        res.status(400).send('Error Saving Report')
    }
}

async function httpSaveReportImage(req, res) {
    const reportId = req.params.reportId
    try {
        const { imageUrl } = req.body

        if (!imageUrl) {
            return res.status(400).json({ message: 'imageUrl is missing in the request body' });
        }

        const result = await saveReportImage(imageUrl, reportId)

        res.status(200).json({ result, message: 'Attachment stored successfully' })
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    httpCreateNewUser,
    httpLoginUser,
    httpCreateReport,
    httpUpdateUsername,
    httpSaveReportImage
}