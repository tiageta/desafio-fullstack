const MySQL = require("./MySQL");

const SQL = `CREATE TABLE IF NOT EXISTS Vehicles (\
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,\
  model VARCHAR(30) NOT NULL UNIQUE,\
  totalSales INT NULL,\
  connected INT NULL,\
  softwareUpdated INT NULL)`;

const TABLE = "Vehicles";

class Vehicle extends MySQL {
  constructor() {
    super(SQL, TABLE);
  }
}

module.exports = new Vehicle();
