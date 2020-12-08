const userController = require('../controllers/user');
const validator = require('../controllers/validator');

const express = require('express');
const route = express.Router();




// get signUp
route.get('/users/signup'); // .....

//  post signUp
route.post('/users/signup', validator.validationInput, userController.signUp);

// get login
route.get('/users/login'); // .....


//  post login
route.post('/users/login', validator.helperToRefresh,userController.postLogin);

//  post forget password
route.post('/users/forget/:vkey', userController.forgetPassword);

// get confirm account

route.get('/users/confirm/:vkey', userController.confirmUser);

// post fill profil

// route.post('/users/profil/:id', userController.fillProfil);

// post logout button

route.post('/logout', userController.logout);

module.exports = route;