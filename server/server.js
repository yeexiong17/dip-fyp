const http = require('http')

const app = require('./src/app')
const PORT = 8000

const server = http.createServer(app)

// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     database: 'dip-fyp'
// });

async function startServer() {
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}

startServer()
