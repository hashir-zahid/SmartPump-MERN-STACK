import { Router } from 'express';
import userController from '../controllers/user.controller.js';

const router = Router();

// Public Customer Routes (No authentication required)
router.get('/machines', userController.getAvailableMachines);
router.post('/purchase', userController.processFuelPurchase);

export default router;