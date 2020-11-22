const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const mysql = require('mysql2');

const cors = require("cors");
// const productsController = require('./controllers/error');
// Set session
const session = require('express-session');

const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

//bodyParser
//extended: false
app.use(bodyParser.urlencoded({extended: true}));

//Test session
// app.use(session({
// 	secret: 's',
// 	resave: false,
// 	saveUninitialized: false,
// 	cookie: {
// 		maxAge: 60 * 1000 *30
// 	}
// }));

//test for connection with our container s in docker

// const conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'Matcha',
//   password: 'root'
// });

// conn.connect(() => {
//   console.log("Container is connected succesfully");
// })

// conn.end(() => {
//   console.log("Eror");
// })
app.use(userRoutes);

app.listen(3001);