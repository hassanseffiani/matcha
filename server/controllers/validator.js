

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