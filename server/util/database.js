const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    // port: '3306',
    user: 'hsf',
    database: 'Matcha',
    password: 'hsf'
});

module.exports = pool.promise();