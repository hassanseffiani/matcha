const userController = require('../controllers/user');

const express = require('express');
const route = express.Router();

//  post signUp
route.post('/users/signup', userController.signUp);

//  get login
route.get('/users/login', userController.getLogin);

//  post login
route.post('/users/login', userController.postLogin);

//  post forget password
route.post('/users/forget', userController.forgetPassword);

module.exports = route;