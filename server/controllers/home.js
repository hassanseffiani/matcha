// Home controller
const jwt = require('jsonwebtoken');

exports.index = (req, res, next) => {
    // show session stored
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
    //destroy session user
    if (req.session.user){
        req.session.destroy(() => {
            res.send('Session deleted')
        })
    }else
        res.send('Nothing to delete')
}