import express from 'express';
import { actualizarUnidad, getSectorController, getUnidadByIdController, getUnidadController, getUsersController, registrarUnidadController } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js'; 
import { crearServicioController, createHabitacionController, editarHabitacionController, eliminarServicioHabitacionController, getHabitacionByIdController, getHabitacionesAdminByIdController, getServiciosController, getServiciosByIdController, getUnidadAdminByIdController, getHabitacionByIdForVerHabitacionController, crearAplicacionController, getAplicacionesByStudentController } from '../controllers/adminController.js';
import { uploadSingleImage } from '../middlewares/uploadImage.js';
import { getHabitacionesForStudentsController } from '../controllers/studentController.js';



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
router.get('/habitacionesforstudents', verifyToken, getHabitacionesForStudentsController );
router.get('/habitacion/:id', verifyToken, getHabitacionByIdController);
router.put('/editarhabitacion/:id', verifyToken,uploadSingleImage, editarHabitacionController);
router.post('/createservicio/:id', verifyToken, crearServicioController);
router.delete('/eliminarservicio/:Id_Habitacion/:Id_Servicio', verifyToken, eliminarServicioHabitacionController);
router.get('/servicios/:Id_Habitacion',  getServiciosController );
router.get('/servicios-habitacion/:id', getServiciosByIdController);
router.get('/informacion-habitacion/:id', verifyToken, getHabitacionByIdForVerHabitacionController);
router.post('/createaplicacion/:Id_Habitacion', verifyToken, crearAplicacionController);
router.get('/obtener-aplicaciones', verifyToken, getAplicacionesByStudentController);

export default router;
