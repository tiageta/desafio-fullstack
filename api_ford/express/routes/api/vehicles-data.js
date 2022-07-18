const express = require("express");
const router = express.Router();
const vehiclesDataController = require("../../controllers/vehicles-data-controller");

router
  .route("/")
  .get(vehiclesDataController.getAllVehiclesData)
  .post(vehiclesDataController.createNewVehicleData);

router
  .route("/:id")
  .get(vehiclesDataController.getVehicleDataById)
  .patch(vehiclesDataController.updateVehicleDataById)
  .delete(vehiclesDataController.deleteVehicleDataById);

module.exports = router;
