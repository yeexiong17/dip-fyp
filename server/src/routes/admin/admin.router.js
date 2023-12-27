const express = require('express')

const {
    httpCreateAdmin,
    httpAdminLogin,
    httpAdminForgetPassword,
    httpAdminResetPassword
} = require('../../controllers/admin/admin.controller')

const adminRouter = express.Router()

adminRouter.post('/sign-up', httpCreateAdmin)
adminRouter.post('/login', httpAdminLogin)
adminRouter.post('/forget-password', httpAdminForgetPassword)
adminRouter.post('/reset-password/:adminId/:token', httpAdminResetPassword)

module.exports = adminRouter