exports.validationInput = (req, res, next) => {
    var dataErr = {};
    var regExpEmail = /([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\@([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\.(com|net)/;
    var regExpPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    (req.body.email) ? ((regExpEmail.test(req.body.email)) ? "" : dataErr.validEmailErr = "Enter a valid email") : "";
    (req.body.password) ? ((regExpPassword.test(req.body.password)) ? "" : dataErr.validPassErr = "Enter a valid password") : "";
    (req.body.cnfrmPassword) ? ((regExpPassword.test(req.body.cnfrmPassword)) ? "" : dataErr.validCnfErr = "Confirm Your password") : "";

    if (regExpEmail.test(req.body.email) && regExpPassword.test(req.body.password) && regExpPassword.test(req.body.cnfrmPassword))
        next();
    else{
        res.locals = dataErr;
        next();
    }
    //after passing error to res.locals ... merge the object in the next middleware
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