const jwt = require('jsonwebtoken');
const User = require('../models/userData');
// CheckAuth require

exports.requireAuth = (req, res, next) => {
    const {headers} = req;
    const token = headers.authorization.replace('Bearer ','')
    // const token = req.cookies.jwt;
    // Second option

    if (token){
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err){
                // console.log(err.message);
                next();
            }else{
                next();
            }
        })
    }else{
        /// redirect  thing
        res.send("redirect to login page")
    }
}

// Check if user already exist ...

exports.checkUser = (req, res, next) => {
    const {headers} = req;
    const token = headers.authorization.replace('Bearer ','')
    // const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            if (err) {
                // console.log(err.messsage);
                res.locals.user = null;
                next();
            }else{
                let user = await User.UserIdModel(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }else{
        res.locals.user = null
        next()
    }
}