const Vehicle = require("../models/Vehicle");

const createNewVehicle = async (req, res) => {
  try {
    const { model } = req?.body;
    if (!model)
      return res.status(400).json({ message: "Unique model is required." });

    const duplicateVehicle = await Vehicle.getOneByParams({ model });
    if (duplicateVehicle)
      return res.status(400).json({ message: "Vehicle already exists." });

    const vehicle = await Vehicle.create({ ...req.body });

    res.status(201).json({ data: vehicle });
  } catch (error) {
    console.error(error);
  }
};

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.getAll();
    if (!vehicles?.length)
      return res.status(404).json({ message: "No vehicles found." });

    res.json({ data: vehicles });
  } catch (error) {
    console.error(error);
  }
};

const getVehicleById = async (req, res) => {
  try {
    const id = parseInt(req?.params?.id);
    if (!id) return res.status(400).json({ message: "ID parameter required." });

    const vehicle = await Vehicle.getOneByParams({ id });
    if (!vehicle)
      return res.status(404).json({ message: `No vehicle matches ID ${id}.` });

    res.json({ data: vehicle });
  } catch (error) {
    console.error(error);
  }
};

const updateVehicleById = async (req, res) => {
  try {
    const id = parseInt(req?.params?.id);
    if (!id) return res.status(400).json({ message: "ID parameter required." });

    const vehicle = await Vehicle.getOneByParams({ id });
    if (!vehicle)
      return res.status(404).json({ message: `No vehicle matches ID ${id}.` });

    const updatedVehicle = await Vehicle.updateById(id, req.body);
    res.json({ data: updatedVehicle });
  } catch (error) {
    console.error(error);
  }
};

const deleteVehicleById = async (req, res) => {
  try {
    const id = parseInt(req?.params?.id);
    if (!id) return res.status(400).json({ message: "ID parameter required." });

    const vehicle = await Vehicle.getOneByParams({ id });
    if (!vehicle)
      return res.status(404).json({ message: `No vehicle matches ID ${id}.` });

    const deletedVehicle = await Vehicle.deleteById(id);
    res.json({ data: deletedVehicle });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createNewVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicleById,
  deleteVehicleById,
};
