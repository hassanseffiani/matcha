const mysql = require("mysql2");

const pool = mysql.createPool({
  host: '192.168.99.110',
  user: 'root',
  database: 'Matcha',
  password: 'tiger',
})

module.exports = pool.promise();