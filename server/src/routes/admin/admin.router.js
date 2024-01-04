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
    httpGetAllCategory
} = require('../../controllers/admin/admin.controller')

const adminRouter = express.Router()

adminRouter.post('/sign-up', httpCreateAdmin)
adminRouter.post('/login', httpAdminLogin)
adminRouter.post('/forget-password', httpAdminForgetPassword)
adminRouter.post('/reset-password/:adminId/:token', httpAdminResetPassword)
adminRouter.get('/dashboard-data', httpGetDashboardData)
adminRouter.post('/get-user-from-report', httpGetUserFromReport)
adminRouter.get('/get-all-review', httpGetAllReview)
adminRouter.post('/accept-new-report', httpAcceptNewReport)
adminRouter.post('/reject-new-report', httpRejectNewReport)
adminRouter.post('/change-password', httpChangePassword)
adminRouter.post('/set-completed-image/:reportId', httpSetCompletedImage)
adminRouter.post('/create-new-category', httpCreateNewCategory)
adminRouter.get('/get-all-category', httpGetAllCategory)

module.exports = adminRouter