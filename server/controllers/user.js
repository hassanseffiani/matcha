// const session = require('express-session');
// const User = require('../models/userData');
const Test = require('../models/test');

// User signUp

// exports.signUp = (req, res, next) => {
//     User.UserNameModel(req.body.userName)
//     .then(([user]) => {
//         if (!user.length){
//             if (req.body.password === req.body.cnfrmPassword){
//                 const user = new User(null ,req.body.email, req.body.userName, req.body.firstName, req.body.lastName, req.body.password);
//                 user.save()
//                 .then(() => {
//                     res.send("You're in now !");
//                 })
//                 .catch(err => console.log(err));
//             }
//             else    
//                 res.send("Confirm Your Password!");
//         }else
//             res.send('Username already exist !');
//     })
// };

// User login

exports.getLogin = (req, res, next) => {
    Test.testModel().then(res.send('test')).catch(err => console.log(err));
    // res.send('test');
}

// exports.postLogin = (req, res, next) => {
//     User.loginModel(req.body.userName, req.body.password).then(([login]) => {
//         // console.log(login);
//         if (login.length){
//             req.session.user = req.body.userName;
//             req.session.opp = 1;
//             data = {
//                 opp: req.session.opp,
//                 user: req.session.user
//             }
//             res.send(data);
//         }
//         else
//             res.send("Username or Password is incorrect");
//     }).catch(err => console.log(err));
// }