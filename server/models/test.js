const db = require('../util/database');

module.exports = class Test {
    static testModel() {
        return db.execute('INSERT INTO `test` (`id`, `test`) VALUES (NULL, "123")');
    };
}