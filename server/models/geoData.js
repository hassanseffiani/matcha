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

  static getAll(cord){
    return db.execute(
      'SELECT u.userName, u.firstName, u.lastName, u.bio, ST_Distance_Sphere(point(?, ?), point (l.lat , l.long)) / 1000 AS km from users as u INNER JOIN location as l on u.id = l.users_id ORDER By ST_Distance_Sphere(point(?,?), point (l.lat , l.long)) / 1000 ASC',
      [cord[0], cord[1], cord[0], cord[1]]
    )
  }
}
