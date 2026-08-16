import { Router } from 'express';
import fuelTypeController from '../controllers/fuelType.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

// Protected Admin Routes
router.route('/')
  .post(verifyJWT, fuelTypeController.createFuelType)
  .get(verifyJWT, fuelTypeController.getAllFuelTypes);

router.put('/:id', verifyJWT, fuelTypeController.updateFuelType);

export default router;