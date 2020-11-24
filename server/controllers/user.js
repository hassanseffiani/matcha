const session = require('express-session');
const User = require('../models/userData');
const Test = require('../models/test');
const { loginModel } = require('../models/userData');

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
                const user = new User(null ,req.body.email, req.body.userName, req.body.firstName, req.body.lastName, req.body.password);
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

exports.postLogin = (req, res, next) => {
    User.UserNameModel(req.body.userName).then(
        ([user]) => {
            if (user.length){
                User.loginModel(req.body.userName, req.body.password).then(([login]) => {
                    if (login.length){
                        req.session.user = req.body.userName;
                        res.send("You\'re In Now!!");
                    }else
                        res.send("Username or Password is incorrect");
                }).catch(err => console.log(err));
            }else
                res.send("Username incorrect");
        }
    ).catch(err => console.log(err));
    // User.loginModel(req.body.userName, req.body.password).then(([login]) => {
        // console.log(req.body.userName);
        // if (login.length){
        //     req.session.user = req.body.userName;
        //     req.session.opp = 1;
        //     data = {
        //         opp: req.session.opp,
        //         user: req.session.user
        //     }
        //     res.send(data);
        // }
        // else
        //     res.send("Username or Password is incorrect");
    // }).catch(err => console.log(err));
}