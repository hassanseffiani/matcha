const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', // ip of docker machine
    // port: '3306',
    user: 'root',
    database: 'Matcha',
    password: ''
});

module.exports = pool.promise();