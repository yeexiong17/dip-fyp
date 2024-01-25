const http = require('http')
const io = require('socket.io')

require('dotenv').config()

const app = require('./src/app')
const PORT = 8000

const server = http.createServer(app)

const socketServer = io(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

const sockets = require('./socket')

function startServer() {
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}

startServer()
sockets.listen(socketServer)
