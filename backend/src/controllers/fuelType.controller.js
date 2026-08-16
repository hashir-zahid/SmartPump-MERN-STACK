import FuelType from '../models/fuelType.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const createFuelType = asyncHandler(async (req, res) => {
  const { name, pricePerLiter } = req.body;

  if (!name || pricePerLiter === undefined) {
    throw new ApiError(400, 'Fuel name and price per liter are required');
  }

  const existingFuel = await FuelType.findOne({ name });
  if (existingFuel) {
    throw new ApiError(409, 'Fuel type already exists');
  }

  const fuelType = await FuelType.create({ name, pricePerLiter });

  return res
    .status(201)
    .json(new ApiResponse(201, fuelType, 'Fuel type created successfully'));
});

const getAllFuelTypes = asyncHandler(async (req, res) => {
  const fuelTypes = await FuelType.find();
  return res
    .status(200)
    .json(new ApiResponse(200, fuelTypes, 'Fuel types fetched successfully'));
});

const updateFuelType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, pricePerLiter } = req.body;

  const fuelType = await FuelType.findById(id);
  if (!fuelType) {
    throw new ApiError(404, 'Fuel type not found');
  }

  if (name) fuelType.name = name;
  if (pricePerLiter !== undefined) fuelType.pricePerLiter = pricePerLiter;

  await fuelType.save();

  return res
    .status(200)
    .json(new ApiResponse(200, fuelType, 'Fuel type updated successfully'));
});

export default {
  createFuelType,
  getAllFuelTypes,
  updateFuelType
};