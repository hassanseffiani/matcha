const userController = require('../controllers/user');
const validator = require('../controllers/validator');
const authVrfy = require('../controllers/autMiddleware');

const express = require('express');
const route = express.Router();

// Images ***************************************************
// add package multer to upload image
// const multer  = require('multer')
// multer destination folder
// const upload = multer({ dest: '../public/uploads/' })
//**********************************************************

// get signUp
route.get('/users/signup'); // .....

//  post signUp
route.post('/users/signup', validator.validationInput, userController.signUp);

// get login
route.get('/users/login'); // .....

//  post login
route.post('/users/login' , validator.validationInput, userController.postLogin);

//  post Send Forget Password
route.post('/users/sendForget', validator.validationInput, userController.sendForget);

//  post forget password
route.post('/users/forget/:vkey', userController.forgetPassword);

// get confirm account

route.get('/users/confirm/:vkey', userController.confirmUser);

// post fill profil

// route.post('/users/profil/:id' ,userController.fillProfil);
//, upload.single('img') helper images

// post logout button

route.post('/logout', userController.logout);

module.exports = route;