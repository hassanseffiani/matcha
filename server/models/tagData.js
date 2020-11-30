const db = require('../util/database');

module.exports = class Tag {
    constructor (id , name){
        this.id = id;
        this.name = name;
    }

    save() {
        return db.execute('INSERT INTO tag(name) VALUES(?)' , [this.name]);
    }

    static tagIdModel(id) {
        return db.execute('SELECT * FROM tag INNER JOIN profil on tag.id = profil.tag_id WHERE profil.users_id = ? limit 1', [id]);
    };
}