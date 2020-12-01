

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