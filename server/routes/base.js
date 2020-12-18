const homeController = require('../controllers/home');
const validator = require('../controllers/validator');
const authVrfy = require('../controllers/autMiddleware');

const express = require('express');
const route = express.Router();

// Get home [page]

route.get('/', authVrfy.requireAuth, homeController.index);

//  edit password logged POST

route.post('/base/editpassword/', authVrfy.requireAuth, validator.validationInput, homeController.editPassword);

//  edit profil logged POST

route.post('/base/editprofil', authVrfy.requireAuth, validator.validationInput, homeController.editProfil);


module.exports = route;