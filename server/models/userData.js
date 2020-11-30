const db = require('../util/database');

module.exports = class User {
    constructor(id, email, userName, firstName, lastName, password) {
        this.id = id;
        this.email = email;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }
    
    save() {
        return db.execute('INSERT INTO users(email, userName, firstName, lastName, password) VALUES(?, ?, ?, ?, ?)'
        , [this.email, this.userName, this.firstName, this.lastName, this.password]);
    };
    
    static fetchAll(cb) {
        return db.execute('SELECT * FROM users');
    };
    
    static loginModel(user, pass) {
        return db.execute('SELECT * FROM users WHERE users.userName = ? AND users.password = ?', [user, pass]);
    };

    static UserNameModel(user) {
        return db.execute('SELECT * FROM users WHERE users.userName = ? limit 1', [user]);
    };
    
    static UserForgetPassword(password) {
        // need to pass vkey to compare with in db. after updating table vkey
        return db.execute('UPDATE users SET password = ?', [password]);
        // return db.execute('SELECT * FROM users WHERE users.email = ? limit 1', [email]);
    };

    static delete(id){
        return db.execute('DELETE FROM products WHERE products.id = ?', [id]);
    }
}