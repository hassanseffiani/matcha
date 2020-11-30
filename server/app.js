const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const errRoutes = require("./routes/error");
const homeRoutes = require("./routes/base");
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

// parse application/json
app.use(bodyParser.json());

// To add Jwt configuration

app.use(userRoutes);
app.use(homeRoutes);
app.use(errRoutes)


app.listen(3001);