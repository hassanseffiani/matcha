const User = require('../models/userData');
const Tag = require('../models/tagData');
const Helpers = require('../util/Helpers');
const jwt = require('jsonwebtoken');


// **********************************************************
// User signUp
// next time ....

// add more information to profile:
// orientation sexuelle
// Need more work
// images 5 max profil photos

// user can edit his information...

// user can change his password connected or not;

// user can see peaple who consulte his profil or like..

// user need to have a score of popularite.

// user doit etre geolocalise, if the user don't want to be geo,find a way to

// do it `_`.

// **********************************************************

exports.signUp = async (req, res, next) => {
    var dataErr = {}, tmp = [], toSend = {}; 

    await User.UserNameModel(req.body.userName).then(([user]) => { user.map(el => {(el.userName === req.body.userName) ? dataErr.userNameErr = "Username already exist !" : '' })});
    await User.UserEmailModel(req.body.email).then(([user]) => { user.map(el => {(el.email === req.body.email) ? dataErr.emailErr = "email already exist !" : '' })});
    (req.body.password !== req.body.cnfrmPassword) ? dataErr.passErr = "Confirm Your Password!" : '';
    toSend = {...dataErr, ...res.locals.input};
    tmp.push(toSend);
    const checkErr = tmp.map(el => {
        console.log(el);
        return (el['userNameErr'] === undefined && el['emailErr'] === undefined && el['passErr'] === undefined && el['validEmailErr'] === undefined && el['validUserNameErr'] === undefined && el['validFirstNameErr'] === undefined && el['validLastNameErr'] === undefined && el['validPassErr'] === undefined && el['validCnfpErr'] === undefined) ? 0 : 1;
    });
    
    if (!checkErr.includes(1)){
        var vkey = Helpers.keyCrypto(req.body.userName);
        var url = "<a href='http://localhost:3001/users/confirm/"+vkey+"'>Confirm your email</a>";
        const user = new User(null ,req.body.email, req.body.userName, req.body.firstName, req.body.lastName, Helpers.keyBcypt(req.body.password), vkey, null, null);
        user.save().then(() => {
                // Sending email before sending a response
                let data = { 'email' : req.body.email, 'url' : url };
                Helpers.sendmail(data);
                res.status(201).json(user);
        }).catch(err => console.log(err));
    }else{
    //     // send error object to react
        res.json(toSend);
    }
};

// creation of a new tokon -> jwt helper

const maxAge = 3 * 24 * 60 * 60;
const createtoken = (id) => {
    return jwt.sign({id}, 'secret', {expiresIn: maxAge});
};

// User login

exports.postLogin = async (req, res, next) => {
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

// snedForget password

exports.sendForget = async (req, res, next) => {
    // Search for email in db
    var dataErr = {}, tmp = [];
    await User.UserEmailModel(req.body.email).then(([user]) => { if (!user.length)dataErr.emailErr = "email doesn't exist !" });
    tmp.push(dataErr);
    const checkErr = tmp.map(el => { return (el['emailErr'] === undefined) ? 0 : 1; });
    // merge error from res.locals from validator controller
    var tmp1 = []; tmp1.push(res.locals.input);
    const checkErr1 = tmp1.map(el => { 
        return (el['validEmailErr'] === undefined) ? 0 : 1; });
    // Show the big problem then we will deleete the first error if this is one,
    if (checkErr1.includes(1))
        dataErr = {...res.locals.input};
    // Send a new verification to the user
    if (!checkErr.includes(1)){
        // need more work ....
        // ....................
        var vkey = Helpers.keyCrypto(req.body.email);
        var url = "<a href='http://localhost:3001/users/forget/"+vkey+"'>Change your password</a>";
        User.UpdateOldVkey(vkey, req.body.email);
        let data = { 'email' : req.body.email, 'url' : url };
        Helpers.sendmail(data);
        res.json({test : "tset"});
    }else
        res.json(dataErr);
    // console.log(dataErr);
}

// forget password

exports.forgetPassword = async (req, res, next) => {
    var dataErr = {};
    var psText;
    await User.vkeyGetUser(req.params.vkey).then( ([user]) => {user.map(el => psText = el.password)});

    // cotroller validator take care of error 
    User.vkeyValidate(req.params.vkey).then(([user]) => {
        let vkey = user.map(el => { return el.vkey; });
        if (vkey.length){
            if (req.body.newPassword === req.body.cnfrmPassword){
                if (!Helpers.cmpBcypt(req.body.newPassword, psText)){
                    User.UserForgetPassword(Helpers.keyBcypt(req.body.newPassword), vkey).then(dataErr.msg = "Password Changed.");
                }else
                    dataErr.msg = "Password already exists";    
            }else
                dataErr.msg = "Confirm Your password";
        }
        else
            dataErr.msg = "Something wrong, please check your email.";
        res.json(dataErr);
    }).catch(err => console.log(err));
}

// validate user profil

exports.confirmUser = (req, res, next) => {
    var dataErr = {};
    //confirm work not perfectly nedd some work
    User.validateUser(req.params.vkey).then(([vKey]) => {
        if (vKey.changedRows === 1){
            dataErr.msg = "You can login now !";
            dataErr.url = "/users/login";
        }else if (vKey.affectedRows === 1){
            dataErr.msg = "Already verify";
            dataErr.url = "/users/login";
        }else{
            dataErr.msg = "You have been enable to verify your account";
            dataErr.url = "/users/sendNewEmail";
        }
        res.json(dataErr);
    }
    ).catch(err => console.log(err));
}


// Fill profil with help of id just for test

exports.fillProfil = async (req, res, next) => {
    // To work with image ********************************
    // console.log(req.file);
    // res.set('Content-Type', 'image/png');
    // res.send('<img src=${req.file.path} width="500"></img>');
    // **************************************************
    // need some wotk after adding react ...
    var dataErr = {};
    let idTag;
    var id = req.params.id, gender = req.body.gender, bio = req.body.bio, tagName = req.body.tag;
    // console.log("   id :  " + req.params.id + "   gender :  " +  req.body.gender + "   bio :  " +  req.body.bio);
    User.UserIdModel(req.params.id).then(([user]) => {
        User.fillProfilUpdate(gender, bio, id).then(([UpRes]) => {
            if (UpRes.changedRows === 1)
                dataErr.msg = "Insert done perfectly";
            else
                dataErr.msg = "Nothing changed";
        })
    });
    await Tag.tagExists(tagName).then(([tagRes]) => { tagRes.map(el => { idTag = el.id; });})
    if (tagName.charAt(0) === '#'){
        Tag.tagExists(tagName).then(([tagRes]) => {
            if (!tagRes.length){
                const tag = new Tag(null, tagName);
                tag.save().then(() => {
                    Tag.getLastOne().then(([last]) => { last.map(el => {
                        // console.log(el.id);
                        Tag.cmpIdTag(el.id).then(([exTag]) => { (!exTag.length) ? Tag.insertInTagUser(id, el.id) : ''; });     
                    })});
                });
            }else{
                Tag.tagIdModel(id, tagName).then(([userTag]) => {
                    if (!userTag.length)
                        Tag.getLastOne().then(([last]) => { last.map(el => { Tag.insertInTagUser(id, el.id) }); });     
                });
                dataErr.msgTag = "Already exists";
            }
        });
    }
    
    res.json(dataErr);
}

// edit to work with jwt

exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1});
    res.redirect('/');
}