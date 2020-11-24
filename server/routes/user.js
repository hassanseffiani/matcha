const userController = require('../controllers/user');
const homeController = require('../controllers/home');

const express = require('express');
const route = express.Router();



// Get home [page]
route.get('/', homeController.index);

//post signUp index
route.post('/users/signup', userController.signUp);
route.get('/users/login', userController.getLogin);

route.post('/users/login', userController.postLogin);

module.exports = route;