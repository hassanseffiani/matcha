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
    
    edit() {
        return db.execute('UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE products.id = ?',
        [this.title, this.price, this.description, this.imageUrl, this.id]);
    };

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
    static delete(id){
        return db.execute('DELETE FROM products WHERE products.id = ?', [id]);
    }
}