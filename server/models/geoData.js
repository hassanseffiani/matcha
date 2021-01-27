const db = require('../util/database')

module.exports = class Geo {
  constructor(id, users_id, city, lat, long) {
    this.id = id
    this.users_id = users_id
    this.city = city
    this.lat = lat
    this.long = long
  }
  save() {
    return db.execute(
      'INSERT INTO location(`users_id`, `city`, `lat`, `long`) VALUES(?, ?, ?, ?)',
      [this.users_id, this.city, this.lat, this.long]
    )
  }

  static getLatLong(id) {
    return db.execute('SELECT * FROM location WHERE users_id = ?', [id])
  }

  static getAll(){
    return db.execute('SELECT * FROM location')
  }
}
