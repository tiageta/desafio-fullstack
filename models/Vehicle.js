const MySQL = require("./MySQL");
const { vehicles: mockVehicles } = require("../config/db-mock-data");

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
    // If empty, fill with mock data; only for testing purposes
    super
      .getAll()
      .then((vehicles) => {
        if (vehicles?.length) return;
        mockVehicles.forEach((vehicle) => super.create(vehicle));
      })
      .catch((error) => console.error(error));
  }
}

module.exports = new Vehicle();
