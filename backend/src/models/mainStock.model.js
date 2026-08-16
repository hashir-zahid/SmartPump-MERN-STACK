import mongoose from 'mongoose';

const mainStockSchema = new mongoose.Schema({
  fuelType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FuelType',
    required: true,
    unique: true
  },
  totalQuantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
}, { timestamps: true });

const MainStock = mongoose.model('MainStock', mainStockSchema);

export default MainStock;