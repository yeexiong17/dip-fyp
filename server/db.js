const mysql = require("mysql2/promise");

const mysqlpool = mysql.createPool({
  host: "127.0.0.1",
  user: "yeexiong",
  password: "yeexiong",
  database: "dip-fyp",
});

module.exports = mysqlpool;
