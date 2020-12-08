const randToken = require('rand-token');

exports.validationInput = (req, res, next) => {
    var regExpEmail = /([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\@([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\.(com|net)/;
    var regExpPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    // console.log(regExpEmail.test(req.body.email));
    if (regExpEmail.test(req.body.email) && regExpPassword.test(req.body.password))
        next();
    else
        next("Input invalid");

    // regExpEmail.test(req.body.email)
}


// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// Verify Token
exports.verifyToken = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
    // Forbidden
        res.sendStatus(403);
    }

}

exports.helperToRefresh = (req, res, next) => {
    var refreshTokens = {};
    const user = {
        username: req.body.userName
    }
    // jwt.sign({user}, 'secretkey', {expiresIn: '5m'});
    var refreshToken = randToken.uid(256);
    req.body.refreshToken = refreshToken;
    refreshTokens[refreshToken] = user.username;
    req.body.refreshTokens = refreshTokens;
    // res.json({
    //     token,
    //     refreshToken
    // })
    // console.log(refreshTokens[refreshToken]);
    next();
}

