const db = require('../util/database')

module.exports = class Block {
  constructor(id, blocker, blocked) {
    this.id = id
    this.blocker = blocker
    this.blocked = blocked
  }

  save() {
    return db.execute(
      'INSERT INTO blocked(blocker, blocked) VALUES(?, ?)',
      [this.blocker, this.blocked]
    )
  }

//   static alreadyReported(reporter, reported) {
//     return db.execute(
//       'SELECT * FROM report WHERE `reporter` = ? AND `reported` = ?', [reporter, reported]
//     )
//   }
} 
