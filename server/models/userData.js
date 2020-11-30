const db = require('../util/database');

module.exports = class User {
    constructor(id, email, userName, firstName, lastName, password, vkey) {
        this.id = id;
        this.email = email;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.vkey = vkey;
    }
    
    save() {
        return db.execute('INSERT INTO users(email, userName, firstName, lastName, password, vkey) VALUES(?, ?, ?, ?, ?, ?)'
        , [this.email, this.userName, this.firstName, this.lastName, this.password, this.vkey]);
    };
    
    static fetchAll(cb) {
        return db.execute('SELECT * FROM users');
    };
    
    static loginModel(user, pass) {
        return db.execute('SELECT * FROM users WHERE users.userName = ? AND users.password = ?', [user, pass]);
    };

    static userIdModel(id) {
        return db.execute('SELECT * FROM users WHERE id = ? limit 1', [id]);
    };

    static UserNameModel(user) {
        return db.execute('SELECT * FROM users WHERE users.userName = ? limit 1', [user]);
    };
    
    static UserForgetPassword(password, vkey) {
        // need to pass vkey to compare with in db. after updating table vkey
        return db.execute('UPDATE users SET password = ? WHERE vkey = ?', [password, vkey.toString()]);
        // return db.execute('SELECT * FROM users WHERE users.email = ? limit 1', [email]);
    };

    static vkeyValidate(vkey){
        return db.execute('SELECT vkey FROM users WHERE vkey = ?', [vkey]);
    }

    static validateUser(vkey){
        return db.execute('UPDATE users SET verify = 1 WHERE vkey = ?', [vkey]);
    }

    // static fillProfilById(id){
    //     return db.execute('UPDATE users SET verify = 1 WHERE vkey = ?', [id]);
    // }

    static delete(id){
        return db.execute('DELETE FROM products WHERE products.id = ?', [id]);
    }
}