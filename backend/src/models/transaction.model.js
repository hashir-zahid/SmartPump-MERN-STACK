import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true // e.g., TXN-839201
  },
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Machine',
    required: true
  },
  fuelType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FuelType',
    required: true
  },
  // Snapshot field prevents historic reporting from changing if fuel name changes later
  fuelTypeNameSnap: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  pricePerLiter: {
    type: Number,
    required: true
  },
  fuelAmount: {
    type: Number,
    required: true // Quantity * Price (Primary Fuel Revenue)
  },
  slipRequested: {
    type: Boolean,
    default: false
  },
  slipFee: {
    type: Number,
    default: 0 // Rs.1 if requested, Rs.0 if not
  },
  totalPaid: {
    type: Number,
    required: true // fuelAmount + slipFee
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Card', 'Digital'],
    required: true
  }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;