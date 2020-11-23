const userController = require('../controllers/user');

const express = require('express');
const route = express.Router();


route.post('/users/signup', userController.signUp);
// route.get('/users/login', userController.getLogin);

// route.post('/users/login', userController.postLogin);

// route.get('/orders', shopController.getOrders);

// route.get('/checkout', shopController.getCheckout);

module.exports = route;