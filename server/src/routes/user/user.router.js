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

const { userAuth } = require('../../middleware/auth')

const userRouter = express.Router()

userRouter.post('/signup', httpCreateNewUser)
userRouter.post('/login', httpLoginUser)
userRouter.post('/update-username/:userId', userAuth, httpUpdateUsername)
userRouter.post('/forget-password', httpForgetPassword)
userRouter.post('/reset-password/:userId/:token', httpResetPassword)
userRouter.post('/report', userAuth, httpCreateReport)
userRouter.get('/report/:userId', userAuth, httpGetAllReport)
userRouter.post('/save-report-image/:reportId', httpSaveReportImage)
userRouter.post('/review', userAuth, httpCreateReview)
userRouter.post('/change-password', userAuth, httpChangePassword)
userRouter.get('/get-all-category', httpGetAllCategory)
userRouter.get('/log-out', httpLogOutUser)
userRouter.get('/get-user-profile', userAuth, httpGetUserProfile)

module.exports = userRouter