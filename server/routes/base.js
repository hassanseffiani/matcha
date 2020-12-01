const homeController = require('../controllers/home');
const validator = require('../controllers/validator');

const express = require('express');
const route = express.Router();

// Get home [page]
route.get('/', validator.verifyToken, homeController.index);

// post logout button

route.post('/logout', homeController.logout);

module.exports = route;