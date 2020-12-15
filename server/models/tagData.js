const db = require('../util/database');

module.exports = class Tag {
    constructor (id , name){
        this.id = id;
        this.name = name;
    }

    save() {
        return db.execute('INSERT INTO tag(name) VALUES(?)' , [this.name]);
    }

    static tagExists(name){
        return db.execute('SELECT id FROM tag WHERE name = ?', [name]);
    }

    static tagIdModel(id) {
        return db.execute('SELECT * FROM tag INNER JOIN profil on tag.id = profil.tag_id WHERE profil.users_id = ? limit 1', [id]);
    };

    static getLastOne(){
        return db.execute('SELECT * FROM tag ORDER BY ID DESC LIMIT 1');
    }

    // Insert data in table tag_user (n,n)
    static insertInTagUser(idUser, idTag){
        return db.execute('INSERT INTO tag_user(users_id, tag_id) VALUES(?, ?)' , [idUser, idTag]);
    }

    static cmpIdTag(idTag){
        return db.execute('SELECT * FROM tag_user WHERE tag_id = ?', [idTag]);
    }
}