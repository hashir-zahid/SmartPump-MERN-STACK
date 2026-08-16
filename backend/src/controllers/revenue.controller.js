import mongoose from 'mongoose';
import Transaction from '../models/transaction.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

const getRevenueAnalytics = asyncHandler(async (req, res) => {
  const { machineId, fuelTypeId, startDate, endDate } = req.query;

  let matchStage = {};

  if (machineId) {
    matchStage.machine = new mongoose.Types.ObjectId(machineId);
  }
  if (fuelTypeId) {
    matchStage.fuelType = new mongoose.Types.ObjectId(fuelTypeId);
  }
  if (startDate || endDate) {
    matchStage.createdAt = {};
    if (startDate) matchStage.createdAt.$gte = new Date(startDate);
    if (endDate) matchStage.createdAt.$lte = new Date(endDate);
  }

  // Aggregate Total Revenue metrics
  const summaryResult = await Transaction.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalFuelRevenue: { $sum: '$fuelAmount' }, // Rule: Slip fee NOT added here
        totalSlipRevenue: { $sum: '$slipFee' },
        totalCollected: { $sum: '$totalPaid' }
      }
    }
  ]);

  // Aggregate Revenue grouped by Machine
  const revenueByMachine = await Transaction.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$machine',
        fuelRevenue: { $sum: '$fuelAmount' },
        totalTransactions: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: 'machines',
        localField: '_id',
        foreignField: '_id',
        as: 'machineInfo'
      }
    },
    { $unwind: '$machineInfo' },
    {
      $project: {
        machineId: '$_id',
        machineName: '$machineInfo.name',
        fuelRevenue: 1,
        totalTransactions: 1
      }
    }
  ]);

  // Aggregate Revenue grouped by Fuel Type
  const revenueByFuelType = await Transaction.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$fuelTypeNameSnap',
        fuelRevenue: { $sum: '$fuelAmount' },
        totalLitersSold: { $sum: '$quantity' }
      }
    }
  ]);

  const summary = summaryResult[0] || {
    totalFuelRevenue: 0,
    totalSlipRevenue: 0,
    totalCollected: 0
  };

  return res.status(200).json(
    new ApiResponse(
      200,
      { summary, revenueByMachine, revenueByFuelType },
      'Revenue analytics fetched successfully'
    )
  );
});

export default {
  getRevenueAnalytics
};