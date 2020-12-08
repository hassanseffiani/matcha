const jwt = require('jsonwebtoken');
const User = require('../models/userData');
// CheckAuth require

exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err){
                console.log(err.message);
                res.send("reqiureAuth");
            }else{
                next();
            }
        })
    }else{
        /// redirect after editing all the ficking thing
        res.send("redirect to login page")
    }
}

// Check if user already exist ...

exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.messsage);
                res.locals.user = null;
                next();
            }else{
                let user = await User.UserIdModel(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
}