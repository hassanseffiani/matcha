CREATE DATABASE IF NOT EXISTS Matcha;

use Matcha;

-- CREATE TABLE test(`id` int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, `test` VARCHAR(233) NOT NULL);

CREATE TABLE IF NOT EXISTS users(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `email` VARCHAR(255) NOT NULL, `userName` VARCHAR(255) NOT NULL, `firstName` VARCHAR(255) NOT NULL, `lastName` VARCHAR(255) NOT NULL, `password` VARCHAR(255) NOT NULL, `vkey` VARCHAR(255) NOT NULL, `verify` int(11) NOT NULL DEFAULT 0);


CREATE TABLE IF NOT EXISTS profil(`id` int(11) NOT NULL AUTO_INCREMENT, `users_id` int(11) NOT NULL, `gender` ENUM('Male', 'Women'), `bio` VARCHAR(255) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE);
-- To add to table profil ...
-- `tag_id` int(11) NOT NULL
-- , FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE

CREATE TABLE IF NOT EXISTS tag_user(`id` int(11) NOT NULL AUTO_INCREMENT, `users_id` int(11) NOT NULL, `tag_id` int(11) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS tag(`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `name` VARCHAR(255) NOT NULL);


INSERT INTO profil(`gender`)
VALUES('Male');
-- INSERT INTO `test` (`id`, `test`) VALUES (NULL, 'w');

INSERT INTO profil(`users_id`, `gender`, `bio`)
VALUES(1,"Male" , "Test something");