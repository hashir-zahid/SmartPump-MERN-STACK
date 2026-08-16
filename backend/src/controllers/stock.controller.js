import mongoose from 'mongoose';
import MainStock from '../models/mainStock.model.js';
import Machine from '../models/machine.mode.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const getMainStock = asyncHandler(async (req, res) => {
  const stock = await MainStock.find().populate('fuelType', 'name pricePerLiter');
  return res
    .status(200)
    .json(new ApiResponse(200, stock, 'Main stock retrieved successfully'));
});

const addMainStock = asyncHandler(async (req, res) => {
  const { fuelTypeId, quantity } = req.body;

  if (!fuelTypeId || !quantity || quantity <= 0) {
    throw new ApiError(400, 'Valid fuel type and quantity are required');
  }

  let stock = await MainStock.findOne({ fuelType: fuelTypeId });
  if (stock) {
    stock.totalQuantity += Number(quantity);
    await stock.save();
  } else {
    stock = await MainStock.create({ fuelType: fuelTypeId, totalQuantity: quantity });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, stock, 'Main stock updated successfully'));
});

const transferStockToMachine = asyncHandler(async (req, res) => {
  const { machineId, transferAmount } = req.body;

  if (!machineId || !transferAmount || transferAmount <= 0) {
    throw new ApiError(400, 'Machine ID and a positive transfer amount are required');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const machine = await Machine.findById(machineId).session(session);
    if (!machine) throw new ApiError(404, 'Machine not found');

    const capacityAvailable = machine.maxCapacity - machine.currentQuantity;
    if (transferAmount > capacityAvailable) {
      throw new ApiError(400, `Transfer exceeds machine space limit (${capacityAvailable} L available)`);
    }

    const mainStock = await MainStock.findOne({ fuelType: machine.fuelType }).session(session);
    if (!mainStock || mainStock.totalQuantity < transferAmount) {
      throw new ApiError(400, 'Insufficient fuel in Main Stock');
    }

    mainStock.totalQuantity -= Number(transferAmount);
    machine.currentQuantity += Number(transferAmount);

    await mainStock.save({ session });
    await machine.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json(new ApiResponse(200, { machine, mainStock }, 'Stock transferred to machine successfully'));
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(error.statusCode || 500, error.message || 'Stock transfer failed');
  }
});

export default {
  getMainStock,
  addMainStock,
  transferStockToMachine
};