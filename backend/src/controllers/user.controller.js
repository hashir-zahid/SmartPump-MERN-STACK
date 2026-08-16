import mongoose from 'mongoose';
import Machine from '../models/machine.mode.js';
import Transaction from '../models/transaction.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const getAvailableMachines = asyncHandler(async (req, res) => {
  const machines = await Machine.find({ currentQuantity: { $gt: 0 } }).populate('fuelType', 'name pricePerLiter');
  return res
    .status(200)
    .json(new ApiResponse(200, machines, 'Active machines fetched successfully'));
});

const processFuelPurchase = asyncHandler(async (req, res) => {
  const { machineId, quantity, paymentMethod, wantSlip } = req.body;

  if (!machineId || !quantity || quantity <= 0 || !paymentMethod) {
    throw new ApiError(400, 'Missing required purchase details');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const machine = await Machine.findById(machineId).populate('fuelType').session(session);
    if (!machine) throw new ApiError(404, 'Selected machine is unavailable');

    if (machine.currentQuantity < quantity) {
      throw new ApiError(400, `Machine has insufficient fuel (Available: ${machine.currentQuantity} L)`);
    }

    const pricePerLiter = machine.fuelType.pricePerLiter;
    const fuelAmount = Number(quantity) * pricePerLiter;
    const slipFee = wantSlip ? 1 : 0; // Strict Rule: Rs.1 fee for requested slip
    const totalPaid = fuelAmount + slipFee;

    machine.currentQuantity -= Number(quantity);
    await machine.save({ session });

    const transactionId = `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const transaction = await Transaction.create([{
      transactionId,
      machine: machine._id,
      fuelType: machine.fuelType._id,
      fuelTypeNameSnap: machine.fuelType.name,
      quantity: Number(quantity),
      pricePerLiter,
      fuelAmount,
      slipRequested: Boolean(wantSlip),
      slipFee,
      totalPaid,
      paymentMethod
    }], { session });

    await session.commitTransaction();
    session.endSession();

    return res
      .status(201)
      .json(new ApiResponse(201, transaction[0], 'Transaction processed successfully'));
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(error.statusCode || 500, error.message || 'Fuel purchase failed');
  }
});

export default {
  getAvailableMachines,
  processFuelPurchase
};