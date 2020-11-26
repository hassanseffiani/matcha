const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
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

//Test session
app.use(session({
    secret: 's',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000 *30
    }
}))

//Home [Page]
// please make sure you add a seddion in your login page
// intersiption here in home page.....

//////////////////////////////////////////////////////

app.use(userRoutes);
app.use(homeRoutes);

app.listen(3001);