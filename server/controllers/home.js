const User = require('../models/userData');
const Helpers = require('../util/Helpers');

// res.locals work like $_SESSION['name']....

// Home controller

exports.index = (req, res, next) => {
    res.locals.user[0].map(el => {
        // console.log(el);
        res.json(res.locals.user[0])
    });
}

// edit information if user want that

exports.edit = (req, res, next) => {

}


// edit password

exports.editPassword = (req, res) => {
    var dataErr = {};
    dataErr.input = {...res.locals.input};
    res.locals.user[0].map(async(el) => {
        var id = el.id, oldP = req.body.password, newP = req.body.newPassword, cnfP = req.body.cnfrmPassword, psText;
        try {
            await User.UserIdModel(id).then( ([user]) => {user.map(el => psText = el.password)});
            if (Helpers.cmpBcypt(oldP, psText)){
                if (newP === cnfP){
                    if (!Helpers.cmpBcypt(newP, psText)){
                        User.UserForgetPassword_(Helpers.keyBcypt(newP), id).then(dataErr.msg = "Password Changed.");
                    }else
                        dataErr.msg = "Enter a new password";    
                }else
                    dataErr.msg = "Confirm Your password";
            }else
               dataErr.msg = "Enter your old password";
            res.json(dataErr);
        } catch (error) {
            console.log(error);
        }
    });
}

// edit profil

exports.editProfil = (req, res) => {
    //to work with ......
    // update all input in our db ...
    // check if it's exists in db
    var dataErr = {};
    dataErr.input = {...res.locals.input};
    // console.log("test params : " + req.body.userName + " " + req.body.email + " " + req.body.firstName + " " + req.body.lastName + " " + req.body.bio);
    res.locals.user[0].map(async(el) => {
        var id = el.id, email = req.body.email, userName = req.body.userName, first = req.body.firstName, last = req.body.lastName, bio = req.body.bio, oldP = req.body.passworde, psText;
        // console.log(id + "  " + email + "  " + userName + "  " + first + "  " + last + "  " + bio + "  " + oldP);
        try {
            await User.UserIdModel(id).then( ([user]) => {user.map(el => psText = el.password)});
            if (Helpers.cmpBcypt(oldP, psText)){
                // Update all information comming from a request

            }else
               dataErr.msg = "Enter your old password";
            res.json(dataErr);
        } catch (error) {
            console.log(error);
        }
    });
}