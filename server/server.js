const http = require('http')

require('dotenv').config();

const app = require('./src/app')
const PORT = 8000

const server = http.createServer(app)

async function startServer() {
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}

startServer()
