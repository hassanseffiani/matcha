const User = require('../models/userData')
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

  /// iiner table users with location set where in search step < 1 km
  
  // var data = [], data1 = {}



    // get all from table location to compare with location of the current user
    // await Geo.getAll().then(([res]) => {
    //   console.log(res)
    //   res.map(el => {
    //     data.push({id: el.users_id, cmp: Math.min(Helpers.cmpGeo(cord, [el.lat, el.long]))})
    //     data.sort((a, b) => a.cmp - b.cmp);
    //   })
    // })
    // console.log(data)
    // after this sort get user by id from the first elemt to the last until we add search method
    /// name, age, tag, image, bio
    // await data.map(el => {
      // data1.test = "test";
      // User.getDataMatch(el.id).then(([res]) => {
      //   console.log(el.id)
      //   res.map(el => {
          // console.log(el)
    //       data1 = {...data1, ...el}
        // })
    //     // await data1.push(...res)
      // })
    // })
    // console.log(data1)
}