const express = require('express')
const multer = require('multer');

const {
    httpCreateNewUser,
    httpLoginUser,
    httpCreateReport,
    httpUpdateUsername,
    httpSaveReportImage
} = require('../../controllers/users/users.controller')

const usersRouter = express.Router()

usersRouter.post('/signup', httpCreateNewUser)
usersRouter.post('/login', httpLoginUser)
usersRouter.post('/report', httpCreateReport)
usersRouter.post('/saveReportImage/:reportId', httpSaveReportImage)
usersRouter.post('/update/:userId', httpUpdateUsername)

module.exports = usersRouter