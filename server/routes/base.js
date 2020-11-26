const homeController = require('../controllers/home');

const express = require('express');
const route = express.Router();

// Get home [page]
route.get('/', homeController.index);

// post logout button

route.post('/logout', homeController.logout);

module.exports = route;