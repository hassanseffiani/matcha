exports.validationInput = (req, res, next) => {
    var dataErr = {};
    var regExpEmail = /([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\@([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\.(com|net)/;
    var regExpPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    (req.body.email) ? ((regExpEmail.test(req.body.email)) ? "" : dataErr.validEmailErr = "Enter a valid email") : "";
    (req.body.password) ? ((regExpPassword.test(req.body.password)) ? "" : dataErr.validPassErr = "Enter a valid password") : "";
    (req.body.cnfrmPassword) ? ((regExpPassword.test(req.body.cnfrmPassword)) ? "" : dataErr.validCnfpErr = "Enter a valid password") : "";
    (req.body.newPassword) ? ((regExpPassword.test(req.body.newPassword)) ? "" : dataErr.validNewpErr = "Enter a valid password") : "";

    if (regExpEmail.test(req.body.email) && regExpPassword.test(req.body.password) && regExpPassword.test(req.body.cnfrmPassword) && regExpPassword.test(req.body.newPassword))
        next();
    else{
        res.locals.input = dataErr;
        next();
    }
    //after passing error to res.locals ... merge the object in the next middleware
}