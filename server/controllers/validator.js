exports.validationInput = (req, res, next) => {
    var dataErr = {};
    var regExpEmail = /([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\@([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\.(com|net)/;
    var regExpPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    (regExpEmail.test(req.body.email)) ? "" : dataErr.emailErr = "Enter a valid email";
    (regExpPassword.test(req.body.password)) ? "" : dataErr.passErr = "Enter a valid password";
    (regExpPassword.test(req.body.cnfrmPassword)) ? "" : dataErr.cnfErr = "Confirm Your password";

    if (regExpEmail.test(req.body.email) && regExpPassword.test(req.body.password) && regExpPassword.test(req.body.cnfrmPassword))
        next();
    else{
        res.locals = dataErr;
        next();
    }
    //after passing error to res.locals ... next middleware
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