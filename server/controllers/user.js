const User = require('../models/userData');
// const Profil = require('../models/profilData');
// const Tag = require('../models/tagData');
const Helpers = require('../util/Helpers');
const jwt = require('jsonwebtoken');

// User signUp

exports.signUp = async (req, res, next) => {
    // we need to verify res.locals error with if !checkErr ...
    // create function that check for undefined value ...
    console.log(res.locals);
    var dataErr = {}, tmp = []; 

    await User.UserNameModel(req.body.userName).then(([user]) => { user.map(el => {(el.userName === req.body.userName) ? dataErr.userNameErr = "Username already exist !" : '' })});
    await User.UserEmailModel(req.body.email).then(([user]) => { user.map(el => {(el.email === req.body.email) ? dataErr.emailErr = "email already exist !" : '' })});
    (req.body.password !== req.body.cnfrmPassword) ? dataErr.passErr = "Confirm Your Password!" : '';
    tmp.push(dataErr);
    const checkErr = tmp.map(el => {
        return (el['userNameErr'] === undefined && el['emailErr'] === undefined && el['passErr'] === undefined) ? 0 : 1;
    });

    if (!checkErr.includes(1)){
        var vkey = Helpers.keyCrypto(req.body.userName);
        const user = new User(null ,req.body.email, req.body.userName, req.body.firstName, req.body.lastName, Helpers.keyBcypt(req.body.password), vkey);
        user.save().then(() => {
                // Sending email before sending a response
                let data = { 'email' : req.body.email, 'vkey' : vkey };
                Helpers.sendmail(data);
                res.status(201).json(user);
        }).catch(err => console.log(err));
    }else{
        dataErr = {...res.locals};

        res.json(dataErr);
    }
};

// creation of a new tokon -> jwt helper

const maxAge = 3 * 24 * 60 * 60;
const createtoken = (id) => {
    return jwt.sign({id}, 'secret', {expiresIn: maxAge});
};

// User login

exports.postLogin = (req, res, next) => {
    User.UserNameModel(req.body.userName).then(
        ([user]) => {
            if (user.length){
                user.map(el => {
                    if (Helpers.cmpBcypt(req.body.password, el.password)){
                        try {
                            const token = createtoken(el.id);
                            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                            res.status(201).json({user: el.id});
                        } catch (err) {
                            res.status(400).json({});
                        }
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

// exports.fillProfil = (req, res, next) => {
//     // console.log("   id :  " + req.params.id + "   gender :  " +  req.body.gender + "   bio :  " +  req.body.bio);
//     User.userIdModel(req.params.id).then(([user]) => {
//         if (user.length){
//             Profil.profilIdModel(req.params.id).then(([fill]) => {
//                 if (!fill.length){
//                     console.log(req.body.tag);
//                     // adding some tag of users
//                     // Tag.tagIdModel(req.params.id).then(([tag]) => {
//                         // if (!tag.length){
//                             // console.log(tag);
//                         // }
//                     // })

//                     // add new  insformation to profil
//                     const profil = new Profil(null , req.params.id, req.body.gender, req.body.bio);
//                     profil.save().then(() => {
//                         res.send("Profil Complet");
//                     });
//                 }
//                 else
//                     res.send("Profil already exists.");
//             });
//         }else
//             res.send("Users doesn't exists.");
//     });
//     // res.send("Enter a valid id");
// }

// edit to work with jwt

exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1});
    res.redirect('/');
}