import Machine from '../models/machine.mode.js';
import FuelType from '../models/fuelType.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const createMachine = asyncHandler(async (req, res) => {
  const { name, fuelTypeId, maxCapacity, currentQuantity } = req.body;

  if (!name || !fuelTypeId || maxCapacity === undefined || currentQuantity === undefined) {
    throw new ApiError(400, 'All machine parameters are required');
  }

  const fuelTypeExists = await FuelType.findById(fuelTypeId);
  if (!fuelTypeExists) {
    throw new ApiError(404, 'Specified fuel type does not exist');
  }

  if (currentQuantity > maxCapacity) {
    throw new ApiError(400, 'Initial quantity cannot exceed maximum capacity');
  }

  const machine = await Machine.create({
    name,
    fuelType: fuelTypeId,
    maxCapacity,
    currentQuantity
  });

  return res
    .status(201)
    .json(new ApiResponse(201, machine, 'Machine created successfully'));
});

const getAllMachines = asyncHandler(async (req, res) => {
  const machines = await Machine.find().populate('fuelType', 'name pricePerLiter');
  return res
    .status(200)
    .json(new ApiResponse(200, machines, 'Machines fetched successfully'));
});

const updateMachineConfig = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, fuelTypeId, maxCapacity, currentQuantity } = req.body;

  const machine = await Machine.findById(id);
  if (!machine) {
    throw new ApiError(404, 'Machine not found');
  }

  if (fuelTypeId) {
    const fuelTypeExists = await FuelType.findById(fuelTypeId);
    if (!fuelTypeExists) throw new ApiError(404, 'Specified fuel type not found');
    machine.fuelType = fuelTypeId;
  }

  if (name) machine.name = name;
  if (maxCapacity !== undefined) machine.maxCapacity = maxCapacity;
  if (currentQuantity !== undefined) {
    if (currentQuantity > machine.maxCapacity) {
      throw new ApiError(400, 'Current quantity cannot exceed maximum capacity');
    }
    machine.currentQuantity = currentQuantity;
  }

  await machine.save();
  const updatedMachine = await Machine.findById(id).populate('fuelType', 'name pricePerLiter');

  return res
    .status(200)
    .json(new ApiResponse(200, updatedMachine, 'Machine configuration updated successfully'));
});

export default {
  createMachine,
  getAllMachines,
  updateMachineConfig
};