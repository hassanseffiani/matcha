const db = require('../util/database');

module.exports = class Profil {
    constructor (id , users_id, gender, bio){
        this.id = id;
        this.users_id = users_id;
        this.gender = gender;
        this.bio = bio;
    }

    save() {
        return db.execute('INSERT INTO profil(users_id, gender, bio) VALUES(?, ?, ?)'
        , [this.users_id , this.gender, this.bio]);
    }

    static profilIdModel(id) {
        return db.execute('SELECT * FROM profil INNER JOIN users on profil.users_id = users.id WHERE users_id = ? limit 1', [id]);
    };
}