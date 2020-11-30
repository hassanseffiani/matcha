const User = require('../models/userData');
const Helpers = require('../util/Helpers');
// const validator = require('../controllers/validator');

// User signUp

exports.signUp = (req, res, next) => {
    var flag = 0;
    User.UserNameModel(req.body.userName)
    .then(([user]) => {
        user.map(el => {
            if (el.email == req.body.email)
                flag = 1;
        });
        if (!user.length){
            if (req.body.password === req.body.cnfrmPassword){
                const user = new User(null ,req.body.email, req.body.userName, req.body.firstName, req.body.lastName, Helpers.keyBcypt(req.body.password));
                user.save().then(() => {
                    let data = {
                        'email' : req.body.email
                    };
                    Helpers.sendmail(data);
                    res.send("You're in now !");
                }).catch(err => console.log(err));
            }
            else    
                res.send("Confirm Your Password!");
        }else{
            if (flag)
                res.send('email already exist !');
            else
                res.send('Username already exist !');
        }
    })
};

validationInput = (req, res, next) => {
    console.log(res.body.userName);
}

// User login

exports.getLogin = (req, res, next) => {
    res.send(req.session.user);
}

exports.postLogin = (req, res, next) => {
    User.UserNameModel(req.body.userName).then(
        ([user]) => {
            if (user.length){
                user.map(el => {
                    if (Helpers.cmpBcypt(req.body.password, el.password)){
                        req.session.user = el.userName;
                        res.send("You're In Now!!");
                    }else
                        res.send("Username or Password is incorrect");
                });
            }else
                res.send("Username incorrect");
        }
    ).catch(err => console.log(err));
}

// forget password

exports.forgetPassword = (req, res, next) => {
    // part to forget password
    // get the oldies password update with method update in the model
    // cotroller validator take care of error 
    // newPassword         cnfrmPassword
    // console.log("old password" + req.body.newPassword + " new password" + req.body.cnfrmPassword);
    
    if (req.body.newPassword === req.body.cnfrmPassword)
        // console.log("Update");
        User.UserForgetPassword(req.body.newPassword).then(res.send("Update Complet"));
    else
        res.send("Error");
}