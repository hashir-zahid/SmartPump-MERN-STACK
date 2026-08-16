import mongoose from 'mongoose';

const fuelTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true // e.g., Petrol, Diesel, High Octane
  },
  pricePerLiter: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true });

const FuelType = mongoose.model('FuelType', fuelTypeSchema);

export default FuelType;    