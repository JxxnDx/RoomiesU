import express from 'express';
import { actualizarUnidad, getSectorController, getUnidadByIdController, getUnidadController, getUsersController, registrarUnidadController } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js'; 
import { createHabitacionController, getHabitacionesAdminByIdController, getUnidadAdminByIdController } from '../controllers/adminController.js';
import { uploadSingleImage } from '../middlewares/uploadImage.js';



const router = express.Router();

router.get('/users', getUsersController);
router.get('/sectores', getSectorController);
router.post('/creacionunidad',registrarUnidadController);
router.get('/unidades', getUnidadController); 
router.get('/unidad/:id', verifyToken, getUnidadByIdController);
router.put('/editarunidad/:id', verifyToken, actualizarUnidad);
router.get('/unidadesbyadmin', verifyToken, getUnidadAdminByIdController );
router.post('/createhabitacion', uploadSingleImage, createHabitacionController);
router.get('/habitacionesbyadmin', verifyToken, getHabitacionesAdminByIdController );


export default router;
