const User = require('../models/userData');
const Helpers = require('../util/Helpers');

// Home controller

exports.index = (req, res, next) => {
    // console.log(res.locals);
    res.locals.user[0].map(el => {
        // console.log(el);

    });
    res.send("Home route");    
}

// edit password

exports.editPassword = (req, res) => {
    res.locals.user[0].map(async(el) => {
        var dataErr = {}, id = el.id, oldP = req.body.password, newP = req.body.newPassword, cnfP = req.body.cnfrmPassword;
        var psText;
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

    // still one case res.locals.input that content all error handled by the controller validator
    // console.log(res.locals.input);
}