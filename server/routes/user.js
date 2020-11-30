const userController = require('../controllers/user');
const validator = require('../controllers/validator');

const express = require('express');
const route = express.Router();

//  post signUp
route.post('/users/signup', validator.validationInput, userController.signUp);

//  get login
route.get('/users/login', userController.getLogin);

//  post login
route.post('/users/login', userController.postLogin);

//  post forget password
route.post('/users/forget/:vkey', userController.forgetPassword);

// get confirm account

route.get('/users/confirm/:vkey', userController.confirmUser);

// post fill profil

route.post('/users/profil/:id', userController.fillProfil);

module.exports = route;