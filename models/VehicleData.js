const MySQL = require("./MySQL");
const { vehiclesData: mockVehiclesData } = require("../config/db-mock-data");

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
    // If empty, fill with mock data; only for testing purposes
    super
      .getAll()
      .then((vehiclesData) => {
        if (vehiclesData?.length) return;
        mockVehiclesData.forEach((vehicleData) => super.create(vehicleData));
      })
      .catch((error) => console.error(error));
  }
}

module.exports = new VehicleData();
