const MySQL = require("./MySQL");
const { users: mockUsers } = require("../config/db-mock-data");
const bcrypt = require("bcrypt");

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
    // If empty, fill with mock data; only for testing purposes
    super
      .getAll()
      .then((users) => {
        if (users?.length) return;
        mockUsers.forEach((user) => {
          bcrypt
            .hash(user.password, 10)
            .then((hash) => {
              user.password = hash;
              super.create(user);
            })
            .catch((error) => console.error(error));
        });
      })
      .catch((error) => console.error(error));
  }
}

module.exports = new User();
