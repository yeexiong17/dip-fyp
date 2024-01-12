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
    httpChangePassword,
    httpGetAllCategory,
    httpLogOutUser,
    httpGetUserProfile
} = require('../../controllers/user/user.controller')

const authentication = require('../../middleware/auth')

const userRouter = express.Router()

userRouter.post('/signup', httpCreateNewUser)
userRouter.post('/login', httpLoginUser)
userRouter.post('/update-username/:userId', authentication, httpUpdateUsername)
userRouter.post('/forget-password', httpForgetPassword)
userRouter.post('/reset-password/:userId/:token', httpResetPassword)
userRouter.post('/report', authentication, httpCreateReport)
userRouter.get('/report/:userId', authentication, httpGetAllReport)
userRouter.post('/save-report-image/:reportId', httpSaveReportImage)
userRouter.post('/review', authentication, httpCreateReview)
userRouter.post('/change-password', authentication, httpChangePassword)

userRouter.get('/get-all-category', httpGetAllCategory)
userRouter.get('/log-out', httpLogOutUser)
userRouter.get('/get-user-profile', authentication, httpGetUserProfile)

module.exports = userRouter