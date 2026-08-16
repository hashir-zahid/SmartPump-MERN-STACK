import { Router } from 'express';
import revenueController from '../controllers/revenue.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

// Protected Admin Route
router.get('/', verifyJWT, revenueController.getRevenueAnalytics);

export default router;