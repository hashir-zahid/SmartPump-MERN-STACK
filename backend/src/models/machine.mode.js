import mongoose from 'mongoose';

const machineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true // e.g., Machine 01, Machine 02
  },
  fuelType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FuelType',
    required: true // Admin can reassign fuel types dynamically
  },
  maxCapacity: {
    type: Number,
    required: true,
    min: 0
  },
  currentQuantity: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true });

const Machine = mongoose.model('Machine', machineSchema);

export default Machine;