const moment = require('moment')

let allAvailableAdmin = []
let allConnectedUser = []

function listen(io) {

    io.on('connection', (socket) => {

        socket.on('createAdminChat', (availableAdmin) => {
            const findAdmin = allAvailableAdmin.find(admin => admin.adminId == availableAdmin.adminId)

            // If there is socket already for the admin, then remove old socket and replace with new socket of that admin
            if (findAdmin) {
                allAvailableAdmin = allAvailableAdmin.filter(admin => admin.adminId !== availableAdmin.adminId)
            }

            allAvailableAdmin.push(availableAdmin)
            console.log('All admin: ', allAvailableAdmin)
        })

        socket.on('userConnected', (user) => {

            // Choose random admin from all available admin
            let randomAdmin = allAvailableAdmin[Math.floor(Math.random() * allAvailableAdmin.length)]
            console.log('Random admin: ', randomAdmin)

            allConnectedUser.push({ ...user, adminSocketId: randomAdmin.socketId })
            console.log(allConnectedUser)

            if (randomAdmin) {
                // socket.emit('message', formatMessage('Resolve Bot', 'Welcome to Live Chat'))
                socket.emit('adminSelected', randomAdmin)
                io.to(randomAdmin.socketId).emit('sendUser', allConnectedUser.filter(user => user.adminSocketId == randomAdmin.socketId))
            }
            else {
                socket.emit('storeMessage', { message: formatMessage('Resolve Bot', 'No Admin Found.'), role: 'bot' })
                socket.emit('no-admin', { message: formatMessage('Resolve Bot', 'Click the link below to get in touch with us!'), role: 'bot' })
            }
        })

        socket.on('chatMessage', ({ username, message, socketId, role }) => {
            let msg = formatMessage(username, message)

            socket.emit('storeMessage', {
                message: msg,
                role,
                socketId: socket.id
            })

            io.to(socketId).emit('storeMessage', {
                message: msg,
                role,
                socketId: socket.id
            })


        })

        // When client disconnects
        socket.on('disconnect', () => {
            let disconnectedUser = allConnectedUser.find(user => user.socketId === socket.id)
            let disconnectedAdmin = allAvailableAdmin.find(admin => admin.socketId === socket.id)

            console.log(disconnectedUser)
            if (disconnectedUser) {

                allConnectedUser = allConnectedUser.filter(user => user.socketId !== socket.id);

                io.to(disconnectedUser.adminSocketId).emit('removeUser', {
                    disconnectedUserSocket: disconnectedUser.socketId,
                    username: disconnectedUser.username
                })
            }
        })

    })
}

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = {
    listen
}