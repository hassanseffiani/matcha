const User = require('../models/userData');
const Profil = require('../models/profilData');
const Tag = require('../models/tagData');
const Helpers = require('../util/Helpers');

// User signUp

exports.signUp = (req, res, next) => {
    // user login duplicate to --fix
    
    var flag = 0;
    User.UserNameModel(req.body.userName)
    .then(([user]) => {
        user.map(el => {
            if (el.email == req.body.email)
                flag = 1;
        });
        if (!user.length){
            if (req.body.password === req.body.cnfrmPassword){
                var vkey = Helpers.keyCrypto(req.body.userName);
                const user = new User(null ,req.body.email, req.body.userName, req.body.firstName, req.body.lastName, Helpers.keyBcypt(req.body.password), vkey);
                user.save().then(() => {
                    let data = {
                        'email' : req.body.email,
                        'vkey' : vkey
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
    // cotroller validator take care of error 
    // console.log("old password" + req.body.newPassword + " new password" + req.body.cnfrmPassword);
    User.vkeyValidate(req.params.vkey).then(([user]) => {
        let vkey = user.map(el => { return el.vkey; });
        if (vkey.length){
            if (req.body.newPassword === req.body.cnfrmPassword)
                User.UserForgetPassword(Helpers.keyBcypt(req.body.newPassword), vkey).then(res.send("Update Complet"));
            else
                res.send("Error");
        }
        else
            res.send("Error");
    }).catch(err => console.log(err));
}

// validate user profil

exports.confirmUser = (req, res, next) => {
    //confirm work not perfectly nedd some work
    if (req.params.vkey.length){
        User.validateUser(req.params.vkey);
    }else
        res.send("Error");
}

// Fill profil with help of id just for test

exports.fillProfil = (req, res, next) => {
    // console.log("   id :  " + req.params.id + "   gender :  " +  req.body.gender + "   bio :  " +  req.body.bio);
    User.userIdModel(req.params.id).then(([user]) => {
        if (user.length){
            Profil.profilIdModel(req.params.id).then(([fill]) => {
                if (!fill.length){
                    console.log(req.body.tag);
                    // adding some tag of users
                    // Tag.tagIdModel(req.params.id).then(([tag]) => {
                        // if (!tag.length){
                            // console.log(tag);
                        // }
                    // })

                    // add new  insformation to profil
                    const profil = new Profil(null , req.params.id, req.body.gender, req.body.bio);
                    profil.save().then(() => {
                        res.send("Profil Complet");
                    });
                }
                else
                    res.send("Profil already exists.");
            });
        }else
            res.send("Users doesn't exists.");
    });
    // res.send("Enter a valid id");
}