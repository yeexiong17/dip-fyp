const mysql = require('mysql2/promise')

const mysqlpool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Abc@123456',
    database: 'dip-fyp',
})

module.exports = mysqlpool
