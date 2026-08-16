import { Router } from 'express';
import stockController from '../controllers/stock.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

// Protected Admin Routes
router.get('/', verifyJWT, stockController.getMainStock);
router.post('/add', verifyJWT, stockController.addMainStock);
router.post('/transfer', verifyJWT, stockController.transferStockToMachine);

export default router;