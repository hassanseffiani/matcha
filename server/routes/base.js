const homeController = require('../controllers/home');
const validator = require('../controllers/validator')
const authVrfy = require('../middleware/autMiddleware');

const express = require('express');
const route = express.Router();

// Get home [page]

route.get('/base', authVrfy.requireAuth, homeController.index);


//continue with this part

route.post('/base/edit', authVrfy.requireAuth, homeController.edit);

//  edit password logged POST

route.post('/base/editpassword/', authVrfy.requireAuth, validator.validationInput, homeController.editPassword);

//  edit profil logged POST

route.post('/base/editprofil', authVrfy.requireAuth, validator.validationInput, homeController.editProfil);


module.exports = route;