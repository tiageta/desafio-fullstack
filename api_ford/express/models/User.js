const MySQL = require("./MySQL");

const SQL = `CREATE TABLE IF NOT EXISTS Users (\
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,\
  username VARCHAR(30) NOT NULL UNIQUE,\
  email VARCHAR(255) NOT NULL UNIQUE,\
  password VARCHAR(255) NOT NULL,\
  fullName VARCHAR(50) NOT NULL,\
  registerDate DATETIME NOT NULL DEFAULT NOW(),\
  refreshToken VARCHAR(255) NOT NULL DEFAULT '')`;

const TABLE = "Users";

class User extends MySQL {
  constructor() {
    super(SQL, TABLE);
  }
}

module.exports = new User();
