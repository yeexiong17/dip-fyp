const express = require('express')

const {
    httpCreateAdmin,
    httpAdminLogin,
    httpAdminForgetPassword,
    httpAdminResetPassword,
    httpGetDashboardData,
    httpGetUserFromReport,
    httpGetAllReview,
    httpAcceptNewReport,
    httpRejectNewReport,
    httpChangePassword,
    httpSetCompletedImage,
    httpCreateNewCategory,
    httpGetAllCategory,
    httpLogOutAdmin,
    httpGetAdminProfile
} = require('../../controllers/admin/admin.controller')

const { adminAuth } = require('../../middleware/auth')

const adminRouter = express.Router()

adminRouter.post('/sign-up', httpCreateAdmin)
adminRouter.post('/login', httpAdminLogin)
adminRouter.post('/forget-password', httpAdminForgetPassword)
adminRouter.post('/reset-password/:adminId/:token', httpAdminResetPassword)
adminRouter.get('/dashboard-data', adminAuth, httpGetDashboardData)
adminRouter.post('/get-user-from-report', adminAuth, httpGetUserFromReport)
adminRouter.get('/get-all-review', adminAuth, httpGetAllReview)
adminRouter.post('/accept-new-report', adminAuth, httpAcceptNewReport)
adminRouter.post('/reject-new-report', adminAuth, httpRejectNewReport)
adminRouter.post('/change-password', adminAuth, httpChangePassword)
adminRouter.post('/set-completed-image/:reportId', adminAuth, httpSetCompletedImage)
adminRouter.post('/create-new-category', adminAuth, httpCreateNewCategory)
adminRouter.get('/get-all-category', adminAuth, httpGetAllCategory)
adminRouter.get('/log-out', httpLogOutAdmin)
adminRouter.get('/get-admin-profile', adminAuth, httpGetAdminProfile)

module.exports = adminRouter