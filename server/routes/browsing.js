const Browsing = require('../controllers/browsing')
// const validator = require('../controllers/validator')
// const Helpers = require('../util/Helpers')

const express = require('express')
const route = express.Router()

// localistatiuon

route.post('/browsing/geo/:id', Browsing.geoOneUser)

// get all users with ◦ Same geographic area as the user. ◦ With a maximum of common tags.◦ With a maximum “fame rating

route.post('/browsing/:id', Browsing.index)

module.exports = route