const homeController = require('../controllers/home');
const validator = require('../controllers/validator');
const authVrfy = require('../controllers/autMiddleware');

const express = require('express');
const route = express.Router();

// Get home [page]

route.get('/', authVrfy.requireAuth, homeController.index);

//  edit password logged

route.post('/base/editpassword/', authVrfy.requireAuth, validator.validationInput, homeController.editPassword);

module.exports = route;