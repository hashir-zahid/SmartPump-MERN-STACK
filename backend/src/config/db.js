import mongoose from 'mongoose';
import FuelType from '../models/fuelType.model.js';

const defaultFuelTypes = [
  { name: 'Petrol', pricePerLiter: 250 },
  { name: 'Diesel', pricePerLiter: 230 },
  { name: 'High Octane', pricePerLiter: 300 }
];

const seedDefaultFuelTypes = async () => {
  try {
    for (const fuelType of defaultFuelTypes) {
      await FuelType.updateOne(
        { name: fuelType.name },
        { $setOnInsert: fuelType },
        { upsert: true }
      );
    }
    console.log('Default fuel types ensured: Petrol, Diesel, High Octane');
  } catch (error) {
    console.error(`Fuel type seeding failed: ${error.message}`);
  }
};

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedDefaultFuelTypes();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;