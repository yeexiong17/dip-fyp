const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const userRouter = require('./routes/user/user.router')
const adminRouter = require('./routes/admin/admin.router')

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(morgan('combined'))

app.use(express.json())

app.use('/user', userRouter)
app.use('/admin', adminRouter)

module.exports = app
