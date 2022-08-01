const VehicleData = require("../models/VehicleData");

const createNewVehicleData = async (req, res) => {
  try {
    const { vin } = req?.body;
    if (!vin)
      return res.status(400).json({ message: "Unique VIN is required." });

    const duplicateVehicleData = await VehicleData.getOneByParams({ vin });
    if (duplicateVehicleData)
      return res.status(400).json({ message: "Vehicle data already exists." });

    const vehicleData = await VehicleData.create({ ...req.body });

    res.status(201).json({ data: vehicleData });
  } catch (error) {
    console.error(error);
  }
};

const getAllVehiclesData = async (req, res) => {
  try {
    const vehiclesData = await VehicleData.getAll();
    if (!vehiclesData?.length)
      return res.status(404).json({ message: "No vehicles data found." });

    res.json({ data: vehiclesData });
  } catch (error) {
    console.error(error);
  }
};

const getVehicleDataById = async (req, res) => {
  try {
    const id = parseInt(req?.params?.id);
    if (!id) return res.status(400).json({ message: "ID parameter required." });

    const vehicleData = await VehicleData.getOneByParams({ id });
    if (!vehicleData)
      return res
        .status(404)
        .json({ message: `No vehicle data matches ID ${id}.` });

    res.json({ data: vehicleData });
  } catch (error) {
    console.error(error);
  }
};

const updateVehicleDataById = async (req, res) => {
  try {
    const id = parseInt(req?.params?.id);
    if (!id) return res.status(400).json({ message: "ID parameter required." });

    const vehicleData = await VehicleData.getOneByParams({ id });
    if (!vehicleData)
      return res
        .status(404)
        .json({ message: `No vehicle data matches ID ${id}.` });

    const updatedVehicleData = await VehicleData.updateById(id, req.body);
    res.json({ data: updatedVehicleData });
  } catch (error) {
    console.error(error);
  }
};

const deleteVehicleDataById = async (req, res) => {
  try {
    const id = parseInt(req?.params?.id);
    if (!id) return res.status(400).json({ message: "ID parameter required." });

    const vehicleData = await VehicleData.getOneByParams({ id });
    if (!vehicleData)
      return res
        .status(404)
        .json({ message: `No vehicle data matches ID ${id}.` });

    const deletedVehicleData = await VehicleData.deleteById(id);
    res.json({ data: deletedVehicleData });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createNewVehicleData,
  getAllVehiclesData,
  getVehicleDataById,
  updateVehicleDataById,
  deleteVehicleDataById,
};
