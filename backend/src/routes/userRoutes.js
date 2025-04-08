import express from 'express';
import { getSectorController, getUsersController } from '../controllers/userController.js';


const router = express.Router();

router.get('/users', getUsersController);
router.get('/sectores', getSectorController);

export default router;
