const moment = require('moment')

let allAvailableAdmin = []

function listen(io) {

    io.on('connection', (socket) => {

        socket.on('createAdminChat', (availableAdmin) => {
            const findAdmin = allAvailableAdmin.find(admin => admin.admin_id == availableAdmin.admin_id)

            // If there is socket already for the admin, then remove old socket and replace with new socket of that admin
            if (findAdmin) {
                allAvailableAdmin = allAvailableAdmin.filter(admin => admin.admin_id !== availableAdmin.admin_id)
            }

            allAvailableAdmin.push(availableAdmin)
            console.log(allAvailableAdmin)
        })

        socket.on('userConnected', (user) => {
            // Choose random admin from all available admin
            let randomAdmin = allAvailableAdmin[Math.floor(Math.random() * allAvailableAdmin.length)]
            console.log(randomAdmin)

            if (randomAdmin) {
                // socket.emit('message', formatMessage('Resolve Bot', 'Welcome to Live Chat'))
                socket.emit('adminSelected', randomAdmin)
                io.to(randomAdmin.socketId).emit('sendUser', user)
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
                role
            })

            io.to(socketId).emit('storeMessage', {
                message: msg,
                role
            })


        })

        // When client disconnects
        socket.on('disconnect', () => {

            io.emit('message', formatMessage('Resolve Bot', `User has left the chat`))
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