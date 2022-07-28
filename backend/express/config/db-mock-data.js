const users = [
  {
    username: "admin",
    email: "admin@ford.com",
    password: "123",
    fullName: "Admin",
  },
  {
    username: "user",
    email: "user@ford.com",
    password: "1234",
    fullName: "User",
  },
];

const vehicles = [
  {
    model: "Ranger",
    totalSales: 145760,
    connected: 70000,
    softwareUpdated: 27550,
  },
  {
    model: "Mustang",
    totalSales: 1500,
    connected: 500,
    softwareUpdated: 750,
  },
  {
    model: "Territory",
    totalSales: 4560,
    connected: 4000,
    softwareUpdated: 3050,
  },
  {
    model: "Bronco Sport",
    totalSales: 7560,
    connected: 4060,
    softwareUpdated: 2050,
  },
];

const vehiclesData = [
  {
    vin: "2FRHDUYS2Y63NHD22454",
    odometer: "23344",
    tirePressure: "36,36,35,34",
    vehicleStatus: "on",
    batteryStatus: "Ok",
    fuelLevel: "76",
    latitude: "-12,2322",
    longitude: "-35,2314",
  },
  {
    vin: "2RFAASDY54E4HDU34874",
    odometer: "130000",
    tirePressure: "36,34,36,33",
    vehicleStatus: "off",
    batteryStatus: "Recharge",
    fuelLevel: "19",
    latitude: "-12,2322",
    longitude: "-35,2314",
  },
  {
    vin: "2FRHDUYS2Y63NHD22455",
    odometer: "50000",
    tirePressure: "36,36,35,34",
    vehicleStatus: "on",
    batteryStatus: "Ok",
    fuelLevel: "90",
    latitude: "-12,2322",
    longitude: "-35,2314",
  },
  {
    vin: "2RFAASDY54E4HDU34875",
    odometer: "10000",
    tirePressure: "36,34,36,33",
    vehicleStatus: "off",
    batteryStatus: "Ok",
    fuelLevel: "25",
    latitude: "-12,2322",
    longitude: "-35,2314",
  },
  {
    vin: "2FRHDUYS2Y63NHD22654",
    odometer: "23544",
    tirePressure: "36,36,35,34",
    vehicleStatus: "on",
    batteryStatus: "Ok",
    fuelLevel: "76",
    latitude: "-12,2322",
    longitude: "-35,2314",
  },
  {
    vin: "2FRHDUYS2Y63NHD22854",
    odometer: "23574",
    tirePressure: "36,36,35,34",
    vehicleStatus: "on",
    batteryStatus: "Ok",
    fuelLevel: "76",
    latitude: "-12,2322",
    longitude: "-35,2314",
  },
];

module.exports = {
  users,
  vehicles,
  vehiclesData,
};
