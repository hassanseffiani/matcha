const userController = require('../controllers/user');
const validator = require('../controllers/validator');
const authVrfy = require('../middleware/autMiddleware')

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

//  post login
route.post('/users/login' , validator.validationInput, userController.postLogin);

//  post Send Forget Password
route.post('/users/sendForget', validator.validationInput, userController.sendForget);

//  post forget password
route.post('/users/forget/:vkey', validator.validationInput, userController.forgetPassword);

// get confirm account

route.get('/users/confirm/:vkey', userController.confirmUser);

//, upload.single('img') helper images

// post logout button

route.post('/logout', userController.logout);

// check if loggin

route.get('/users/checkLogin', userController.checkLogin);


module.exports = route;