const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/user/user.router')
const adminRouter = require('./routes/admin/admin.router')

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
)

app.use(morgan('combined'))
app.use(cookieParser())
app.use(express.json())

app.use('/user', userRouter)
app.use('/admin', adminRouter)

module.exports = app