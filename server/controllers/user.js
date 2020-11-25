const User = require('../models/userData');
const Helpers = require('../util/Helpers');

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
                        if (req.session.user)
                            req.session.destroy;
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