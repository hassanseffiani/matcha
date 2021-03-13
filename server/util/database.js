const mysql = require("mysql2");

///////////////////////////// get ip docker container /////////////////////////////
const ip = require("docker-ip");

const ipAdress = ip(); // 192.168.99.100 a "default" one

///////////////////////////////////////////////////////////////////////////////////////

const pool1 = mysql.createPool({
  host: `${ipAdress}`,
  user: "root",
  password: "tiger",
});


pool1.query('CREATE DATABASE IF NOT EXISTS Matcha")

const pool = mysql.createPool({
  host: `${ipAdress}`,
  user: "root",
  database: "Matcha",
  password: "tiger",
});


const allQuery =
  'use Matcha; CREATE TABLE IF NOT EXISTS users(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT)'
pool.query(allQuery)


module.exports = pool.promise()