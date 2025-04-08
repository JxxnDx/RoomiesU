import express from "express";
import { registerAdmin, registerStudent, loginAdmin, loginStudent, logout, getAuthenticatedUser } from "../controllers/authController.js";
import { forgotPassword, resetPassword } from "../controllers/passwordController.js";
import { verifyToken } from "../middlewares/authMiddleware.js"; 


const router = express.Router();

// Rutas para admin
router.post("/register/admin", registerAdmin);
router.post("/login/admin", loginAdmin);

// Rutas para estudiantes
router.post("/register/student", registerStudent);
router.post("/login/student", loginStudent);

// Ruta de logout
router.post("/logout", verifyToken, logout);

// Rutas para recuperación de contraseña
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

//Ruta token sesión
router.get("/me", verifyToken, getAuthenticatedUser);

export default router;
