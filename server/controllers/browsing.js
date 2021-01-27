const User = require('../models/userData')
const Tag = require('../models/tagData')
const Helpers = require('../util/Helpers')
const Geo = require('../models/geoData')



exports.geoOneUser = (req, res) => {
  // get location about with users id
  const { id } = req.params
  Geo.getLatLong(id).then(([loc]) => {
    loc.map((el) => {
      res.json([el.lat, el.long])
    })
  })
}

exports.index = async (req, res, next) => {
  const {cord} = req.body
  var data = []

    // get all from table location to compare with location of the current user
    await Geo.getAll().then(([res]) => {
      res.map(el => {
        data.push({id: el.users_id, cmp: Math.min(Helpers.cmpGeo(cord, [el.lat, el.long]))})
      })
    })
    data.sort((a, b) => a.cmp - b.cmp);
    // after this sort get user by id from the first elemt to the last until we add search method
    console.log(data)
}