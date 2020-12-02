// Home controller
const jwt = require('jsonwebtoken');

exports.index = (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err)
            res.sendStatus(403);
        else{
            res.json({
                message: "Home Page",
                authData
            })
        }
    })
}

// edit to work with jwt

exports.logout = (req ,res, next) => {
    // plz add section logout;
    // good understanding jwt

    
    // send to tis port error;
    //204
    //destroy session user
    // if (req.session.user){
    //     req.session.destroy(() => {
    //         res.send('Session deleted')
    //     })
    // }else
    //     res.send('Nothing to delete')
}