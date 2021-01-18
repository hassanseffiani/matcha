const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const errRoutes = require("./routes/error");
const homeRoutes = require("./routes/base");
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth");
const passport = require("passport");
const pss = require("./util/passport.js");

const cors = require("cors");
// const productsController = require('./controllers/error');
const express = require('express');
const app = express();
app.use(express.json());
var corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true
}
app.use(cors(corsOptions));
app.use(cookieParser());

//bodyParser
//extended: false
app.use(bodyParser.urlencoded({extended: true}));

// Images ***************************************************
// need help of package path
const path = require('path');
// static folder to thing like image ...
app.use(express.static(path.join(__dirname, 'public')));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public')
//   },
//   filename: (req, file, cb) => {
//     console.log(file)
//     cb(null, Date.now() + path.extname(file.originalname))
//   },
// })
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//     cb(null, true)
//   } else {
//     cb(null, false)
//   }
// }
// global.upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
//test this method we will convert this to our method
// multiple images upload.array('images', 100)
// app.post('/upload', [upload.single('images')], (req, res, next) => {
//     try {
//         return res.status(201).json({
//             message: 'File uploded successfully'
//         });
//     } catch (error) {
//         console.error(error);
//     }
// });

//**********************************************************

// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(authRoutes);
app.use(homeRoutes);
app.use(userRoutes);
app.use(errRoutes)


app.listen(3001);