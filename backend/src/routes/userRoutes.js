import express from 'express';
import { getUsersController } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsersController);

export default router;
