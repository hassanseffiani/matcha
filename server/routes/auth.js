const authVrfy = require('../controllers/autMiddleware');

const express = require('express');
const route = express.Router();

// Checkuser
route.get('*', authVrfy.checkUser);

module.exports = route;