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

//Home [Page]
// please make sure you add a seddion in your login page
// intersiption here in home page.....

app.get("/", (req, res) => {
    // data= req.session;
    // console.log(data);
    // console.log("re");
    // res.send("test");
})

//////////////////////////////////////////////////////

app.use(userRoutes);

app.listen(3001);