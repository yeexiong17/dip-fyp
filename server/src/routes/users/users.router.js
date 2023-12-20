const express = require('express')

const {
    httpCreateNewUser,
    httpLoginUser
} = require('../../controllers/users/users.controller')

const usersRouter = express.Router()

usersRouter.post('/signup', httpCreateNewUser)
usersRouter.post('/login', httpLoginUser)


module.exports = usersRouter