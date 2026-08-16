import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Route Imports
import authRouter from './routes/auth.routes.js';
import fuelTypeRouter from './routes/fuelType.routes.js';
import machineRouter from './routes/machine.routes.js';
import stockRouter from './routes/stock.routes.js';
import userRouter from './routes/user.routes.js';
import revenueRouter from './routes/revenue.routes.js';

// Middleware Import
import errorHandler from './middlewares/error.middleware.js';

const app = express();

// Core Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// Route Declarations
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/fuel-types', fuelTypeRouter);
app.use('/api/v1/machines', machineRouter);
app.use('/api/v1/stock', stockRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/revenue', revenueRouter);

// Global Error Handler Middleware
app.use(errorHandler);

export default app;