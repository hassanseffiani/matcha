const db = require('../util/database');

module.exports = class Test {
    static testModel() {
        return db.execute('INSERT INTO `test` (`id`, `test`) VALUES (NULL, "123")');
    };

    // CREATE TABLE test(
    //     `id` int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    //     `test` VARCHAR(233) NOT NULL
    // )

    // INSERT INTO `test` (`id`, `test`) VALUES (NULL, 'w');
}