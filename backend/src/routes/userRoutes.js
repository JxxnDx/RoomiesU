import express from 'express';
import { actualizarUnidad, getSectorController, getUnidadByIdController, getUnidadController, getUsersController, registrarUnidadController } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.get('/users', getUsersController);
router.get('/sectores', getSectorController);
router.post('/creacionunidad',registrarUnidadController)
router.get('/unidades', getUnidadController); 
router.get('/unidad/:id', verifyToken, getUnidadByIdController);
router.put('/editarunidad/:id', verifyToken, actualizarUnidad)

export default router;
