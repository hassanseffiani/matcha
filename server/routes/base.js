const homeController = require('../controllers/home');
const validator = require('../controllers/validator');
const authVrfy = require('../controllers/autMiddleware');

const express = require('express');
const route = express.Router();

// Checkuser
route.get('*', authVrfy.checkUser);

// Get home [page]
route.get('/', authVrfy.requireAuth, homeController.index);


module.exports = route;