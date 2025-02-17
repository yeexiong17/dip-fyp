const express = require('express')

const {
    httpCreateNewUser,
    httpLoginUser,
    httpCreateReport,
    httpUpdateProfile,
    httpGetAllReport,
    httpSaveReportImage,
    httpForgetPassword,
    httpResetPassword,
    httpCreateReview,
    httpChangePassword,
    httpGetAllCategory,
    httpLogOutUser,
    httpGetUserProfile,
    httpContactUs,
    httpFirebaseImage,
    httpSaveUserImage,
    httpDeleteProfilePicture
} = require('../../controllers/user/user.controller')

const { userAuth } = require('../../middleware/auth')

const userRouter = express.Router()

userRouter.post('/signup', httpCreateNewUser)
userRouter.post('/login', httpLoginUser)
userRouter.post('/update-profile/:userId', userAuth, httpUpdateProfile)
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
userRouter.post('/contact-us', httpContactUs)
userRouter.post('/firebase-image', userAuth, httpFirebaseImage)
userRouter.post('/save-user-image/:userId', userAuth, httpSaveUserImage)
userRouter.post('/delete-profile-picture', userAuth, httpDeleteProfilePicture)

module.exports = userRouter