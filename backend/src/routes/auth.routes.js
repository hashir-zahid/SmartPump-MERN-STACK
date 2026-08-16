import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', authController.registerAdmin);
router.post('/login', authController.loginAdmin);
router.post('/refresh-token', authController.refreshAccessToken);
router.put('/update-admin', verifyJWT, authController.updateAdminDetails);

export default router;