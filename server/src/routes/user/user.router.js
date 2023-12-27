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
    httpCreateReview,
    httpChangePassword
} = require('../../controllers/user/user.controller')

const userRouter = express.Router()

userRouter.post('/signup', httpCreateNewUser)
userRouter.post('/login', httpLoginUser)
userRouter.post('/update-username/:userId', httpUpdateUsername)
userRouter.post('/forget-password', httpForgetPassword)
userRouter.post('/reset-password/:userId/:token', httpResetPassword)
userRouter.post('/report', httpCreateReport)
userRouter.get('/report/:userId', httpGetAllReport)
userRouter.post('/save-report-image/:reportId', httpSaveReportImage)
userRouter.post('/review', httpCreateReview)
userRouter.post('/change-password', httpChangePassword)

module.exports = userRouter