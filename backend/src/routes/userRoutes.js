import express from 'express';
import { getSectorController, getUsersController, registrarUnidadController } from '../controllers/userController.js';



const router = express.Router();

router.get('/users', getUsersController);
router.get('/sectores', getSectorController);
router.post('/creacionunidad',registrarUnidadController)


export default router;
