const MySQL = require("./MySQL");

const SQL = `CREATE TABLE IF NOT EXISTS VehiclesData (\
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,\
  vin VARCHAR(20) NOT NULL UNIQUE,\
  odometer VARCHAR(30) NOT NULL DEFAULT '',\
  tirePressure VARCHAR(30) NOT NULL DEFAULT '',\
  vehicleStatus VARCHAR(30) NOT NULL DEFAULT '',\
  batteryStatus VARCHAR(30) NOT NULL DEFAULT '',\
  fuelLevel VARCHAR(30) NOT NULL DEFAULT '',\
  latitude VARCHAR(30) NOT NULL DEFAULT '',\
  longitude VARCHAR(30) NOT NULL DEFAULT '')`;

const TABLE = "VehiclesData";

class VehicleData extends MySQL {
  constructor() {
    super(SQL, TABLE);
  }
}

module.exports = new VehicleData();
