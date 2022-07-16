const express = require("express");
const router = express.Router();
const vehiclesController = require("../controllers/vehicles-controller");

router
  .route("/")
  .get(vehiclesController.getAllVehicles)
  .post(vehiclesController.createNewVehicle);

router
  .route("/:id")
  .get(vehiclesController.getVehicleById)
  .patch(vehiclesController.updateVehicleById)
  .delete(vehiclesController.deleteVehicleById);

module.exports = router;
