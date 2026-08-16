import { Router } from 'express';
import machineController from '../controllers/machine.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

// Protected Admin Routes
router.route('/')
  .post(verifyJWT, machineController.createMachine)
  .get(verifyJWT, machineController.getAllMachines);

router.put('/:id', verifyJWT, machineController.updateMachineConfig);

export default router;