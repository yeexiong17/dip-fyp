const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const usersRouter = require('./routes/users/users.router')

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(morgan('combined'))

app.use(express.json())

app.use('/user', usersRouter)
app.use('/user', usersRouter)

module.exports = app
