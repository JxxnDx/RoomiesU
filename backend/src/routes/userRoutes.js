import express from 'express';
import { actualizarPerfilController, actualizarUnidad, getInfoPerfilController, getSectorController, getUnidadByIdController, getUnidadController, getUsersController, registrarUnidadController } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js'; 
import { crearServicioController, createHabitacionController, editarHabitacionController, eliminarServicioHabitacionController, getHabitacionByIdController, getHabitacionesAdminByIdController, getServiciosController, getServiciosByIdController, getUnidadAdminByIdController, getHabitacionByIdForVerHabitacionController, crearAplicacionController, getAplicacionesByStudentController, getAplicacionesByAdminController, actualizarAplicacionController, sendEmailApplicationController, getEstadisticasByAdminController, getAplicacionesAceptadasByAdminController, crearRentaController, getRentasByAdminController, actualizarRentaByAdminController, registrarPagoRentaByAdminController, actualizarRentaByStudentController } from '../controllers/adminController.js';
import { uploadSingleImage } from '../middlewares/uploadImage.js';
import { getHabitacionesForStudentsController, getRentasByStudentController } from '../controllers/studentController.js';
import { setAccion } from '../middlewares/setAccion.js';


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
router.get('/obtener-aplicaciones/admin', verifyToken, getAplicacionesByAdminController);
router.post('/actualizar-aplicacion/:id/aceptar', setAccion('aceptar'), verifyToken, actualizarAplicacionController);
router.post('/actualizar-aplicacion/:id/rechazar', setAccion('rechazar'), verifyToken, actualizarAplicacionController);
router.post('/enviar-email-aplicacion', sendEmailApplicationController);
router.get('/estadisticas', verifyToken, getEstadisticasByAdminController);
router.get('/aplicaciones-aceptadas', verifyToken, getAplicacionesAceptadasByAdminController);
router.get('/info-perfil', verifyToken, getInfoPerfilController);
router.put('/editar-perfil', verifyToken, actualizarPerfilController);
router.post('/crear-renta', verifyToken, crearRentaController);
router.get('/rentas-admin', verifyToken, getRentasByAdminController);
router.get('/rentas-estudiante', verifyToken, getRentasByStudentController);
router.put('/actualizar-renta-admin/:id/cancelar', setAccion('cancelar'), verifyToken, actualizarRentaByAdminController);
router.put('/actualizar-renta-admin/:id/terminar', setAccion('terminar'), verifyToken, actualizarRentaByAdminController);
router.put('/pago-renta-admin/:id/pago', setAccion('pago'), verifyToken, registrarPagoRentaByAdminController);
router.put('/actualizar-renta-estudiante/:id/cancelar', setAccion('cancelar'), verifyToken, actualizarRentaByStudentController);
router.put('/actualizar-renta-estudiante/:id/terminar', setAccion('terminar'), verifyToken, actualizarRentaByStudentController);
router.put('/actualizar-renta-estudiante/:id/aceptar', setAccion('aceptar'), verifyToken, actualizarRentaByStudentController);

export default router;
