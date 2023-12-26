const express = require('express')

const {
    httpCreateNewUser,
    httpLoginUser,
    httpCreateReport,
    httpUpdateUsername,
    httpGetAllReport,
    httpSaveReportImage,
    httpForgetPassword,
    httpResetPassword,
    httpCreateReview
} = require('../../controllers/users/users.controller')

const usersRouter = express.Router()

usersRouter.post('/signup', httpCreateNewUser)
usersRouter.post('/login', httpLoginUser)
usersRouter.post('/update-username/:userId', httpUpdateUsername)
usersRouter.post('/forget-password', httpForgetPassword)
usersRouter.post('/reset-password/:userId/:token', httpResetPassword)
usersRouter.post('/report', httpCreateReport)
usersRouter.get('/report/:userId', httpGetAllReport)
usersRouter.post('/save-report-image/:reportId', httpSaveReportImage)
usersRouter.post('/review', httpCreateReview)

module.exports = usersRouter