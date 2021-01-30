const db = require('../util/database')

module.exports = class Like {
  constructor(id, liker, liked) {
    this.id = id
    this.liker = liker
    this.liked = liked
  }
  save() {
    return db.execute(
      'INSERT INTO likes(`liker`, `liked`) VALUES(?, ?)',
      [this.liker, this.liked]
    )
  }

  static checkIfLiked(data){
      return db.execute('SELECT * from likes WHERE liker = ? AND liked = ?', [data.idLiker, data.idLiked])
  }
}